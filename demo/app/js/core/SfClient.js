"use strict";
define([
	'forcetk',
	'core/oauthPlugin',
	'core/UserInfo',
	'core/NetworkHelper',
	'core/EventListener',
	'json!core/../../bootconfig.json',
	'mediator/mediator'],function(forcetk,oauthPlugin,UserInfo,net,EventListener,bootconfig,m){

		//Initialize forceTk/SfClient
		var clientId = bootconfig.remoteAccessConsumerKey;
		var loginUrl = bootconfig.loginUrl;
		var client;
		var mediator = new m();
		var init = function(){
			console.info("Initializing ForceTk client");
			if(typeof cordova !== "undefined") {
				console.info("Using device mode for ForceTk client");
				client = new forcetk.Client(clientId,loginUrl,null);
			} else {
				console.info("Using developer mode for ForceTk client");
				client = new forcetk.Client(clientId,loginUrl,'http://localhost/sfapp/proxy.php?mode=native');
			}
			//Initialize oauthPlugin
			if(typeof oauthPlugin.getAuthCredentials === "undefined") {
				oauthPlugin.init();
			}
			//Initialize client with creds
		};
		var logout = function(){
			oauthPlugin.logout();
		};
		var login = function(){
			oauthPlugin.getAuthCredentials(function(creds){
				console.log("Received creds",creds);
				client.setSessionToken(creds.accessToken,"v34.0",creds.instanceUrl);
				client.setRefreshToken(creds.refreshToken);
				client.loginUrl = "https://"+creds.identityUrl.split('/')[2]; //Fix introduced to identify login url
				UserInfo.setUserId(creds.userId);
				UserInfo.setOrgId(creds.orgId);
				if(UserInfo.isUserChanged || UserInfo.isOrgChanged || !UserInfo.isUserInfoAvailable) {
						UserInfo.fetchUserInfo(client);
				}
				logger.info('CORE','Logged In User Info',UserInfo.getUser());
				if(net.isConnectedToNetwork())
				{
					if(typeof oauthPlugin.forcetkRefresh !== "undefined"){
						oauthPlugin.forcetkRefresh(client,function(){
							console.log("Refreshed access token");
							client.apiVersion = "v34.0";
						},function(){
							console.error("Got some unhandled error",arguments);
						});
					} else {
						client.refreshAccessToken(function(oauth){
							console.log("Refreshing access token");
					 		client.setSessionToken(oauth.access_token, "v34.0",client.instanceUrl);
			 			});
					}
				}

				console.info('Publishing login successful');
				mediator.publish('login successful');
				//Whenever app comes online refresh client token
				EventListener.bind("online",function(){
					console.info("Just came online, need to refresh token");
					if(typeof oauthPlugin.forcetkRefresh !== "undefined"){
						oauthPlugin.forcetkRefresh(client,function(){
							console.log("Refreshed access token");
							client.apiVersion = "v34.0";
						},function(){
							console.error("Got some unhandled error",arguments);
						});
					} else {
						client.refreshAccessToken(function(oauth){
							console.log("Refreshing access token");
					 		client.setSessionToken(oauth.access_token, "v34.0",client.instanceUrl);
			 			});
					}
				});

			},function(){
				alert("Unable to get auth credentials");
			});
		};
		init();
	 	return {login:login,logout:logout,client:client,mediator:mediator};
});