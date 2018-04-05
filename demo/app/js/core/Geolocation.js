//Geolocation
"use strict";
define([],function(){
	//Geolocation Module
	var statusCode = {
		'PERMISSION_DENIED_FOR_LOCATION' : -1,
		'LOCATION_SETTING_NOT_ENABLED' : -2,
		'UNABLE_TO_CONNECT_GOOGLE_PLAY_SERVICE' : -3,
		'UNABLE_TO_GET_LOCATION' : -4,
		'USER_DENIED_TO_GET_LOCATION' : -5
	};
	var getLocation = function(successCallback,errorCallback){
		if(typeof cordova != "undefined") {
			if(typeof navigator.Geolocation != "undefined"){
				navigator.Geolocation.getLocation(successCallback,errorCallback);
			} else {
				console.error("Geolocation is not defined");
				errorCallback({status:"failed"});
			}
		} else {
			navigator.geolocation.getCurrentPosition(function(geoPos){
				successCallback({latitude:geoPos.coords.latitude,longitude:geoPos.coords.longitude});	
			},errorCallback);
		}
	};
	var GeolocationModule = {
		statusCode : statusCode,
		getLocation : getLocation
	};
	return GeolocationModule;
});