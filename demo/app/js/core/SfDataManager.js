"use strict";
define(['core/SfClient','mediator/mediator','json!../../json/dummyActivity.json'],function(client,m,dA){
	logger.info('Initializing SfDataManager');
	var mediator = new m();
	var login = function(){
		client.login();
	};
	var logout = function(){
		if(typeof(client.client)!=="undefined") {
			client.logout();
		}
	};
	client.mediator.subscribe('login successful','SfDataManager',function(){
		logger.debug('I have received login message and I will mediate it now');
		mediator.publish('login successful');
	});
	var taskList = [];
	var processRecords = function(records){
		var retList = [];
		if(records.length !== 0) {
			records.forEach(function(task){
				console.log(task);
				var newRec = {};
				newRec.Id = task.Id;
				newRec.accountId = task.Account.Id;
				newRec.accountName = task.Account.Name;
				newRec.shopOwner = task.shopOwner;
				newRec.lastPurchase = "2800";
				newRec.balanceDue = "500";
				newRec.todaysOrder = "1850";
				newRec.check = false;
				newRec.address = task.Account.BillingStreet + ' ' + task.Account.BillingCity;
				newRec.activityDate = task.ActivityDate;
				retList.push(newRec);
				/*
				Id : 1,
				accountName : "Vikas Medical Store",
				shopOwner: "Mr. Rampal Singh",
				lastPurchase:"280.00",
				balanceDue:"50.00",
				todaysOrder:"180.00",
				check:false,
				address: "2 LSC, Uday Park, New Delhi"
				*/
			});
		}
		return retList;
	}
	var getAllTask = function(success,error){
		if(taskList.length === 0) {
			//Bypass COde
			taskList = processRecords(dA);
			console.log(taskList);
			success(taskList);
			return;
			logger.info('Fetching Account');
			var query = 'SELECT Id, Account.Id, Account.Name, Account.Shop_Owner__c, Account.Last_Purchase__c, Account.Balance_Due__c, ActivityDate, Account.billingstreet,Account.billingcity FROM Task WHERE ActivityDate = TODAY AND WHATID != null AND In_Mobile__c = true';			
			client.client.query(query,function(response){
				var records = response.records;
				logger.debug('Got Response',response);
				taskList = processRecords(records);
				console.log(taskList);
				success(taskList);
			},function(response){
				error(response);
			});
		} else {
			success(taskList);
		}
	};

	var insertAttachment = function(rec,successCallback, errorCallback){
		client.client.create(
					'attachment',
					rec,
					function(r){
						successCallback(r);
					},
					function(r){
						errorCallback(r);
					});
	}
	var saveCase = function(){

	};

	return {
		login:login,
		logout:logout,
		mediator:mediator,
		getAllTask:getAllTask,
		saveCase:saveCase,
		insertAttachment:insertAttachment
	};
});