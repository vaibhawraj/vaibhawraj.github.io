"use strict";
define([],function(){
	var isConnectedToNetwork = function(){
		/*Using navigator.connection plugin [Reference : https://github.com/apache/cordova-plugin-network-information]*/
		/*https://cordova.apache.org/docs/en/3.0.0/cordova/connection/connection.html*/
			if(typeof(window.NetConnectivity) == "undefined") {
				window.NetConnectivity = true;
			}
			if(typeof(navigator)!="undefined") {
				if(typeof(navigator.connection)!="undefined") {
					if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
						window.NetConnectivity = false;
					}
					else {
						window.NetConnectivity = true;
					}
				}
				else {
					console.warn('connection plugin is not defined');
				}
			} else { 
				console.warn('navigator is not defined');
			}
			return window.NetConnectivity;
	};

	return {
		isConnectedToNetwork : isConnectedToNetwork
	};
});