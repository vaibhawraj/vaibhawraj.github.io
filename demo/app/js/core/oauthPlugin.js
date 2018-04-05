"use strict";
define(['json!core/../../bootconfig.json'],function(bootconfig){
	var oauthPlugin = {};

	//Initializing oauthPlugin
	var salesforce_sdk = false; //It will use salesforce sdk for login
	var inAppBrowser = true;
	var init = function(){
			//Check if we are in dev mode or on mobile device
			console.debug("Initializing oauthPlugin");
			if(typeof cordova != "undefined") {
				console.debug("Using device mode for oauthPlugin");
				if(salesforce_sdk) {
					var oauthPluginTemp = cordova.require("com.salesforce.plugin.oauth");
					for(var attName in oauthPluginTemp) {
						this[attName] = oauthPluginTemp[attName];
					}
				} else if(inAppBrowser){
					oauthPlugin.getAuthCredentials = function(successCallback,errorCallback){
						this.successCallback = successCallback;
						this.errorCallback = errorCallback;
						var creds = localStorage.getItem("creds");
						this.login();
						/*if(creds !== null){
							creds = JSON.parse(creds);
							successCallback(creds);
						} else {
							this.login();
						}*/
					};
					oauthPlugin.login = function(){
						logger.debug('Initializing inAppBrowser login');
						logger.debug('cordova.InAppBrowser',cordova.InAppBrowser,typeof(cordova.InAppBrowser));
						if(typeof(cordova.InAppBrowser) === "undefined") {
							logger.error('cordova.InAppBrowser plugin missing');
							throw new Error('cordova.InAppBrowser plugin missing');
						}
						var url = getAuthorizeUrl(bootconfig.loginUrl,bootconfig.remoteAccessConsumerKey,bootconfig.oauthRedirectURI);
						var options = {
							location: 'no',
							clearcache: 'yes',
							clearsessioncache: 'yes',
							zoom: 'no',
							hardwareback: 'no',
							mediaPlaybackRequiresUserAction: 'yes'
						};
						var optionsStringArray = [];
						Object.keys(options).forEach(function(key){
							optionsStringArray.push(key + '=' + options[key]);
						});
						var optionsString = optionsStringArray.join(',');
						var target = '_blank';
						this.inAppBrowser = cordova.InAppBrowser.open(url,target,optionsString);
						var iab = this.inAppBrowser;
						var that = this;
						iab.addEventListener('loadstart', function(event){
							logger.debug('Firing loadstart');
							iab.hide();
							var loadUrl = event.url;
							var domainName = loadUrl.split('/')[2];
							console.log('Domain Name', domainName);
							if(domainName == 'login.salesforce.com' || domainName == 'test.salesforce.com') {
								var code = "";
								code = code + "if(document.getElementById('logo')!==null)document.getElementById('logo').src='https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1146px-Dabur_Logo.svg.png';";
								code = code + "if(document.getElementById('username')!==null)document.getElementById('username').value='arai@daburdemo.demo';";
								code = code + "if(document.getElementById('password')!==null)document.getElementById('password').value='salesforce';";
								iab.executeScript({code:code});
								iab.insertCSS({
									code:'body{background-color:#e8f5e9!important}'
								});
							} else {
								console.log(bootconfig.oauthRedirectURI,event.url);
								if(event.url.indexOf(bootconfig.oauthRedirectURI) === 0) {
									//Its a callback
									var urlArray = event.url.split('#');
									var paramHash = urlArray[1];
									var paramHashArray = paramHash.split('&');
									var response = {};
									for (var paramToken in paramHashArray) {
									    var parts = paramHashArray[paramToken].split('=');
										response[parts[0]] = unescape(parts[1]);
									}
									iab.close();
									handleOauthResponse(response);
								}
							}
						});
						iab.addEventListener('loadstop', function(event){
							logger.debug('Firing loadstart');
							iab.show();
							var loadUrl = event.url;
							var domainName = loadUrl.split('/')[2];
							console.log('Domain Name', domainName);
							if(domainName == 'login.salesforce.com' || domainName == 'test.salesforce.com') {
								var code = "";
								code = code + "if(document.getElementById('logo')!==null)document.getElementById('logo').src='https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1146px-Dabur_Logo.svg.png';";
								code = code + "if(document.getElementById('username')!==null)document.getElementById('username').value='arai@daburdemo.demo';";
								code = code + "if(document.getElementById('password')!==null)document.getElementById('password').value='salesforce';";
								iab.executeScript({code:code});
								iab.insertCSS({
									code:'body{background-color:#e8f5e9!important}'
								});
							} else {
								console.log(bootconfig.oauthRedirectURI,event.url);
								if(event.url.indexOf(bootconfig.oauthRedirectURI) === 0) {
									//Its a callback
									var urlArray = event.url.split('#');
									var paramHash = urlArray[1];
									var paramHashArray = paramHash.split('&');
									var response = {};
									for (var paramToken in paramHashArray) {
									    var parts = paramHashArray[paramToken].split('=');
										response[parts[0]] = unescape(parts[1]);
									}
									iab.close();
									handleOauthResponse(response);
								}
							}
						});
					};
					oauthPlugin.logout = function(){

					};
				}
			} else {
				console.debug("Using developer mode for oauthPlugin");
				window.handleOauthResponse = handleOauthResponse;
				this.successCallback = null;
				this.errorCallback = null;
				this.getAuthCredentials = function(successCallback,errorCallback){
						this.successCallback = successCallback;
						this.errorCallback = errorCallback;
						//Check for localStorage first;
						var creds = localStorage.getItem("creds");
						if(creds !== null){
							creds = JSON.parse(creds);
							successCallback(creds);
						} else {
							//Begin login process
							var url = getAuthorizeUrl(bootconfig.loginUrl,bootconfig.remoteAccessConsumerKey,bootconfig.oauthRedirectURI);
							console.debug('Login Url',url);
							window.open(url);
						}
					};
				this.logout = function(){
					localStorage.removeItem("creds");
					logger.info('Successfully Logout');
					//throw new Error("Logout method is not implemented for oauthPlugin");
				};

				//define handleOauthResponse
			}
	};

	var getAuthorizeUrl = function(loginUrl,clientId,redirectUri){
		return loginUrl+'/services/oauth2/authorize?display=popup'+
			'&response_type=token&client_id='+escape(clientId)+
			'&redirect_uri='+escape(redirectUri);
	};

	var handleOauthResponse = function(oauth){
		console.debug("Received oauth response",oauth);
		//creds = {creds.accessToken,creds.instanceUrl,creds.refreshToken,creds.userId, creds.orgId, creds.identityUrl} - Actual oauthResponse
		var creds = {
			accessToken:oauth.access_token,
			instanceUrl:oauth.instance_url,
			userId:oauth.id.split('/')[5],
			orgId:oauth.id.split('/')[4],
			refreshToken:oauth.refresh_token,
			identityUrl:oauth.id
		};
		localStorage.setItem("creds",JSON.stringify(creds));
		oauthPlugin.successCallback(creds);
	};
	oauthPlugin.init = init;
	return oauthPlugin;
});