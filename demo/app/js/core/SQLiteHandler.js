//This module uses SQLite syntaxing to communicate with database
//For Refernce on SQLite : http://www.tutorialspoint.com/sqlite
'use strict';
define([],function(){
	console.debug("Defining SQL Api");
	var db = null;
	var isConnected = false;
	var isReady = false;
	var dbName = 'sfdc_ObjectData_db';
	
	var getDbName = function(){
		return dbName;
	}
	/*
	*	This method connect Database
	*/
	var connectDb = function(successCallback) {
		console.info("Connecting Database");
		if(typeof cordova != "undefined") {
				console.info("Using Cordova");
				isReady = window.isDeviceReady;
				if(isReady && typeof window.sqlitePlugin != "undefined") {
					var dbLocation = 'default';
					db = window.sqlitePlugin.openDatabase({name:dbName,location:dbLocation},
						function(){
							isConnected = true;
							successCallback();
						});
					
				}
		} else {
			console.info("Using WebSQL");
			//These varant are required for opening Database using webSql only, not required for sqlite
			var dbVersion = '1.0.0';
			var dbDisplayname = dbName;
			var dbSize = 1024*1024*2;

			db = window.openDatabase(dbName,dbVersion,dbDisplayname,dbSize);
			isConnected = true;
			successCallback();
		}
	};

	/*
	*	This method creates table if not exists
	*	@param	tableName		Name of table
	*	@param	fieldSet		Javascript Array for object with column name and data type and other property. eg
								[
									{
										columnName : 'Id'
										datatype : 'TEXT'
									}
								]
	*   @param  successCallback Function that will be called on successful creation of Table
	*	@param	errorCallback	Function called on error
	*/
	var create = function(tableName, fieldSet, successCallback, errorCallback){
		//Prepare Query
		var fieldList = "";
		//Prepare fieldList from fieldSet in sql statement format
		if(fieldSet.constructor === Array) {
			forEach(fieldSet,function(list,index,column) {
				if(index !== 0) fieldList += ",";
				fieldList += (column.columnName + " " + column.datatype);
			});
		} else {
			console.debug("FieldSet",fieldSet);
			throw new Error("fieldSet is not defined as Array");
		}

		var statement = 'CREATE TABLE IF NOT EXISTS '+ tableName + ' (' + fieldList + ');';
		execute(statement, successCallback, errorCallback);
	};

	/*
	*	This method alters table but only adds column cannot remove any column. Thats limitation of SQLite
	*	@param	tableName		Name of table
	*	@param	fieldSet		Javascript Array for object with column name and data type and other property. eg
								[
									{
										columnName : 'Id'
										datatype : 'TEXT'
									}
								]
	*   @param  successCallback Function that will be called on successful creation of Table
	*	@param	errorCallback	Function called on error
	*/
	var alter = function(tableName, fieldSet, successCallback,errorCallback) {
		console.info("Altering Table " + tableName);

		//Get Current Table Info
		var SQLITE_MASTER = 'SQLITE_MASTER';
		var criteria = "type='table' AND name='"+tableName+"'";
		select(SQLITE_MASTER,criteria,null,function(SQLResultSet){
			//Get sql
			if(SQLResultSet.rows.length !== 0) {
				var sql = SQLResultSet.rows.item(0).sql;
				var sqlfieldList = sql.substring(sql.indexOf('(')+1,sql.lastIndexOf(')')).split(',');
				var fieldsToAdd = [];
				var fieldList = [];
				sqlfieldList.forEach(function(elem){
					fieldList.push(elem.split(' ')[0]);	//It will break 'Id TEXT' => ['Id','TEXT'] => 'Id'
				});
				var statementList = [];
				fieldSet.forEach(function(column){
					var isFieldExist = fieldList.indexOf(column.columnName) != -1;
					if(!isFieldExist) {
						fieldsToAdd.push(column);
						var statement = 'ALTER TABLE '+tableName+' ADD COLUMN '+column.columnName+' '+column.datatype+';';
						statementList.push(statement);
					}
				});

				console.debug('Adding '+fieldsToAdd.length+' fields');
				if(statementList.length>0) {
					executeBatch(statementList,successCallback,errorCallback);
				} else {
					if(typeof successCallback != "undefined")
					successCallback();
				}
			} else {
				console.warn('No Table found with name',tableName);
				console.info('Creating table');
				create(tableName,fieldSet, successCallback,errorCallback);
			}
		},function(SQLError){
			console.error(SQLError);
			if(typeof errorCallback != "undefined")
				errorCallback(SQLError);
		});
	};

	/*
	*	This method perform insert operation
	*	@param	tableName		Name of table
	*	@param	fieldValue		Javascript object with field values. Eg.
								{
									'Id' : 'randomId1',
									'Name' : 'randomName'
								}
	*   @param  successCallback Function that will be called on successful insertion of row
	*	@param	errorCallback	Function called on error
	*/
	var insert = function(tableName, fieldValue, successCallback, errorCallback) {

		//console.info("Inserting data into table " + tableName);
		//Prepare Query
		var statement = getInsertStatement(tableName, fieldValue);
		execute(statement, successCallback, errorCallback);
	};

	/*
	*	This method perform select operation
	*	@param	tableName		Name of table
	*	@param	critera			Currently its pure SQL criteria. TO-DO : May be we need to modify it later
	*   @param  successCallback Function that will be called on successful query with resultset with argument 
	*	@param	errorCallback	Function called on error
	*/
	var select = function(tableName, criteria, orderBy, successCallback, errorCallback) {

		//console.info("Running Select query on table " + tableName);

		//Prepare Statement
		var statement = 'SELECT rowid, * FROM '+ tableName;
		if(containValue(criteria)) {
			statement += ' WHERE ' + criteria;
		}
		if(containValue(orderBy)) {
			statement += ' ORDER BY ' + orderBy;
		}
		statement += ';';
		execute(statement, successCallback, errorCallback);
	};

	/*
	*	This method perform delete operation
	*	@param	tableName		Name of table
	*	@param	critera			Currently its pure SQL criteria. TO-DO : May be we need to modify it later
	*   @param  successCallback Function that will be called on successful query with resultset
	*	@param	errorCallback	Function called on error
	*/
	var _delete = function(tableName, criteria, successCallback, errorCallback) {

		//console.info("Running Delete op on table " + tableName);

		var statement = getDeleteStatement(tableName,criteria);
		execute(statement, successCallback, errorCallback);
	};

	/*
	* 	This method performs update Op
	*	@param	tableName		Name of table
	*	@param	fieldValue		Javascript object with field values. Eg.
								{
									'Id' : 'randomId1',
									'Name' : 'randomName'
								}
	*	@param	critera			Currently its pure SQL criteria. TO-DO : May be we need to modify it later
	*   @param  successCallback Function that will be called on successful query with resultset
	*	@param	errorCallback	Function called on error
	*/

	var update = function(tableName, fieldValue, criteria, successCallback, errorCallback) {
		
		//console.info("Updating data into table " + tableName);
		//Prepare Query
		var statement = getUpdateStatement(tableName,fieldValue,criteria);
		execute(statement, successCallback, errorCallback);		
	};

	/*
	* 
	*/

	var getUpdateStatement = function(tableName, fieldValue, criteria) {
		var statement = "";
		var setList = "";
		//Prepare fieldList from fieldSet in sql statement format
		if(fieldValue.constructor === Object) {
			forEach(fieldValue,function(list,index,key,value) {
					if(index !== 0) setList += ",";
					//Note for SQLite Uses ' as escape character so lets replace all single quotes with double single quotes
					if(value !== null)
					{
						if(typeof value == "string")// As number dont have quotes :P
							value = value.replace(/'/g,"''");
						setList += "'" + key + "' = '" + value + "'";
					} else {
						setList += "'" + key + "' = " + value + "";
					}
			});
		} else {
			console.debug("FieldValue",fieldValue);
			throw new Error("fieldValue is not defined as Object");
		}

		statement = "UPDATE " + tableName + " SET " + setList;
		if(containValue(criteria)) {
			statement += ' WHERE ' + criteria;
		}
		statement += ';';
		return statement;
	};

	var getInsertStatement = function(tableName,fieldValue) {
		var columnList = "";
		var valueList = "";
		//Prepare fieldList from fieldSet in sql statement format
		if(fieldValue.constructor === Object) {
			forEach(fieldValue,function(list,index,key,value) {
					if(index !== 0){
						columnList += ",";
						valueList += ",";
					}
					columnList += key;
					//Note for SQLite Uses ' as escape character so lets replace all single quotes with double single quotes
					if(value !== null)
					{
						if(typeof value == "string")// As number dont have quotes :P
							value = value.replace(/'/g,"''");
						valueList += "'" + value + "'";
					} else {
						valueList += "" + value + "";
					}
					
			});
		} else {
			console.debug("FieldValue",fieldValue);
			throw new Error("fieldValue is not defined as Object");
		}

		var statement = 'INSERT INTO '+ tableName + ' (' + columnList + ') VALUES ('+ valueList +');';
		return statement;
	};

	var getDeleteStatement = function(tableName,criteria) {
		//Prepare Statement
		var statement = 'DELETE FROM '+ tableName;
		if(containValue(criteria)) {
			statement += ' WHERE ' + criteria;
		}
		statement += ';';
		return statement;
	};

	var getDropStatement = function(tableName){
		var statement = 'DROP TABLE '+ tableName + ';';
		return statement;
	};
	
	var drop = function(tableName,successCallback,errorCallback) {
		//console.info("Dropping table " + tableName);
		//Prepare Query
		var statement = getDropStatement(tableName);
		execute(statement, successCallback, errorCallback);
	};


	/*
	*	This method execute SQL statement
	*	@param	statement		SQL Statement
	*   @param  successCallback Function that will be called on successful query with resultset
								@return SQLResultSet results
														rows (SQLResultSetList)
															item
	*	@param	errorCallback	Function called on error
	*/
	var execute = function(statement,successCallback,errorCallback){
		//console.debug('Sql Statement ' + statement);
		if(typeof statement == "undefined") throw new Error("Undefined statement");
		if(!isConnected) {
			//Lets connect with db first
			console.info("Database is not connected");
			var currentArguments = arguments;
			connectDb(function(){
				console.info("Reinvoking pending action");
				execute.apply(null,currentArguments);	//Becoz arguments method always refer to current methods arguments
			});
			return;
		}
		//console.info("Executing Statement");
		db.transaction(function(tx){
			tx.executeSql(statement,[],
				//SuccessCallback
				function(tx,sqlResultSet){
					//console.debug("Execute SQL - OK");
					if(typeof(successCallback) == "function") successCallback(sqlResultSet);
				},
				function(tx, err){
					//console.warn("Execute SQL Error ",err.message);
					if(typeof(errorCallback) == "function") errorCallback(err);
			});
		});
	};

	/*
	*	This method execute SQL statement
	*	@param	statement		SQL Statement
	*   @param  successCallback Function that will be called on successful query with resultset
								@return SQLResultSet results
														rows (SQLResultSetList)
															item
	*	@param	errorCallback	Function called on error
	*/
	var executeBatch = function(statementList,successCallback,errorCallback){
		//console.debug('Sql Statement ' + statementList);
		if(!isArray(statementList)) throw new Error("statementList must be Array");
		if(!isConnected) {
			//Lets connect with db first
			console.info("Database is not connected");
			var currentArguments = arguments;
			connectDb(function(){
				console.info("Reinvoking pending action");
				executeBatch.apply(null,currentArguments);	//Becoz arguments method always refer to current methods arguments
			});
			return;
		}
		//console.info("Executing Batch Statement");
		db.transaction(function(tx){
			statementList.forEach(function(statement){
				tx.executeSql(statement);	
			});
		},function(err){
					console.warn("Execute SQL Error ",err);
					if(typeof(errorCallback) == "function") errorCallback(err);
		},function(tx,sqlResultSet){
					console.debug("Execute SQL - OK");
					if(typeof(successCallback) == "function") successCallback(sqlResultSet);
		});
	};

	/*
	*	This method iterates through element of Array and executes function on each element
	*	@param		arr 	Array to iterate
	*	@param		fn 		Function to execute on each element
	*/
	var forEach = function(arr,fn) {
		var i;
		if(arr.constructor === Array) {
			for(i=0;i<arr.length;i++)
				fn.apply(null,[arr,i,arr[i]]);
		} else if(arr.constructor === Object) {
			var keys = arr.constructor.keys(arr);
			for(i=0;i<keys.length;i++)
				fn.apply(null,[ arr,i,keys[i],arr[keys[i]] ]);
		}
	};

	//Helper Methods
 	var isDefined = function(v) {return typeof v !== "undefined";};
 	var isNotNull = function(v) {return v !== null;};
 	//var isNull = function(v) {return !isNotNull(v);};
 	var isArray = function(v) {return v.constructor.name == "Array";};
 	var isBlank = function(v) {return v === "";};
 	var containValue = function(v){return isDefined(v) && isNotNull(v) && !isBlank(v);};

	return {
		create : create,
		insert : insert,
		drop : drop,
		select : select,
		alter : alter,
		update : update,
		delete : _delete,
		execute : execute,
		getDeleteStatement : getDeleteStatement,
		getUpdateStatement : getUpdateStatement,
		getInsertStatement : getInsertStatement,
		getDropStatement : getDropStatement,
		getDbName : getDbName,
		executeBatch : executeBatch
	};
});