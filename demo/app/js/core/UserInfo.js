// It defines methods to access user info
"use strict";
define(['core/NetworkHelper','core/EventListener','mediator/mediator'],function(net,EventListener,Mediator){
	/*
	*	It stores User Id in local storage, if User Id is different from existing storag, then it will turn on the flas that user is changed
	*/
	var isUserInfoAvailable = (localStorage.getItem("user")!==null);
	
	var mediator = new Mediator();
	
	var getUserId = function(){
		return localStorage.getItem('userId');
	};

	var getUser = function(){
		var user = localStorage.getItem('user');
		if(user!==null){
			user = JSON.parse(user);
		}
		return user;
	};

	var setOrgId = function(id){
		var existingOrgId = localStorage.getItem("orgId");
		if(id != existingOrgId) {
			localStorage.setItem("orgId",id);
			console.info("It seems we are in new org");
			logger.info("Core","It seems we are in new org, Org Changed");
			this.isOrgChanged = true;
			this.isUserInfoAvailable = false;
			this.mediator.publish('UserChanged');
		}
	};

	var setUserId = function(id){
		var existingUserId = localStorage.getItem("userId");
		if(id != existingUserId) {
			localStorage.setItem("userId",id);
			console.info("It seems we have a new user");
			logger.info("Core","It seems we have a new user, User Changed");
			this.isUserChanged = true;
			this.isUserInfoAvailable = false;
			this.mediator.publish('UserChanged');
		}
	};

	var fetchUserInfo  = function(client){
		if(net.isConnectedToNetwork()) {
			if(!this.isUserInfoAvailable) {
				this.queryUserInfo(client);
			}
		} else {
			if(!this.isUserInfoAvailable) {
				EventListener.bind("online",function(){
					//Check Again
					if(!this.isUserInfoAvailable) {
						//Get userInfo
						this.queryUserInfo(client);
					}
				});
			}
		}
	};
	var queryUserInfo = function(client){
		var id = this.getUserId();
		var that = this;
		if(id===null) {return;}
		var query = "SELECT Id, FirstName, LastName, Email, Username FROM User WHERE Id = '"+id+"'";
		client.query(query,function(response){
			console.debug('Updating user info');
			localStorage.setItem("user",JSON.stringify(response.records[0]));
			that.isUserInfoAvailable = true;
			that.mediator.publish('updatedUserInfo');
		},function(err){
			console.error('Unable to retrieve user info',err);
		});
	};

	var UserInfo = {
		setUserId:setUserId,
		setOrgId:setOrgId,
		isUserChanged:false,
		isOrgChanged:false,
		isUserInfoAvailable:isUserInfoAvailable,
		fetchUserInfo:fetchUserInfo,
		queryUserInfo:queryUserInfo,
		getUserId:getUserId,
		getUser:getUser,
		mediator:mediator
	};
	return UserInfo;
});