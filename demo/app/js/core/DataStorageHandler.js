/*
 * DataStorageHandler.js : Module implements an adapter for sql database exposing basic functional methods
 * Adapter Pattern : Purpose of this module is to delegate Data Storage Responsibility to desired Handler
 */
"use strict";
define(['SQLiteHandler'],function(SQLiteHandler){

	var dbApi = null;
	var useApi = "SQLiteHandler";	//TO-DO : Need to build FileHandler in future
	/*
	*	This method is used to initialize Database
	*/
	var init = function() {
			console.info("Initialize DatabaseHandler called");
			if(useApi == "SQLiteHandler")
				dbApi = SQLiteHandler;

		};

	/*
	*	This method invokes method from connected dbApi
	*	@param		methodName		Name of method to invoke, it must be defined in connected Api
	*	@param		args 			Argument passed to exposed method
	*	@param		dontReinvoke	[optional] Internal variable to be used within the method, used for breaking cycling in case method is reinvoked
	*/
	var invoke = function(methodName,args,dontReinvoke) {
		var isDbInitialized = (typeof dbApi != "undefined");
		var isMethodDefined = (typeof dbApi[methodName] == "function");

		if(isDbInitialized) {
				if(isMethodDefined) {
					return dbApi[methodName].apply(null,args);
				} else {
					throw new Error(methodName + " is not defined");	//Its a fatal error,  probably due to developer mistake
				}
		} else {
				console.warn("Database Adapter is not initialized");
				init();
				if(typeof dontReinvoke == "undefined" || dontReinvoke) {
					//Retry to invoke one last time
					console.info("Reinvoking method " + methodName);
					invoke.apply(null,[methodName,args,false]);
				}
		}
	};
	
	var DatabaseHandler = {
		create : function() { invoke("create",arguments); },
		insert : function() { invoke("insert",arguments); },
		select : function() { invoke("select",arguments); },
		drop : function() { invoke("drop",arguments); },
		alter : function() { invoke("alter",arguments); },
		update : function() { invoke("update",arguments); },
		delete : function() { invoke("delete",arguments); },
		getDeleteStatement : function() { return invoke("getDeleteStatement",arguments); },
		getUpdateStatement : function() { return invoke("getUpdateStatement",arguments); },
		getInsertStatement : function() { return invoke("getInsertStatement",arguments); },
		getDropStatement : function() { return invoke("getDropStatement",arguments); },
		getDbName : function() { return invoke("getDbName",arguments); },
		executeBatch : function() { invoke("executeBatch",arguments); },
		execute : function() { invoke("execute",arguments);}
	};
	init();
	return DatabaseHandler;
});


