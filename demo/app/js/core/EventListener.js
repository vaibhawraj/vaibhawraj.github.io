//EventListener
// Binds Windows Event with respective callback method

"use strict";
define([],function(){

	//onDeviceReady Event --> This event fires when App is ready on device, it is bind with onStart Event of Android Lifecycle
	//onResume Event --> This event is fired on onResume Event of Android Lifecycle
	//onPause Event --> This event is fired on onPause Event of Android Lifecycle
	//onLoad Event --> 


	//exposing bind method
	var _bind = function(event,fn,pA) {
		var eventFn = function(){
				fn.apply(null,arguments);
		};
		if(typeof pA != "undefined")
			document.addEventListener(event,eventFn,pA);
		else
			document.addEventListener(event,eventFn);
	};
	
	var bind = function(event,fn,pA){
		if(event.constructor.name == "String") {
				_bind.apply(null,arguments);
		} else if(event.constructor.name == "Array"){
			event.forEach(function(e){
				_bind(e,fn,pA);
			});
		} else {
			throw new Error("Event must be of type string or array");
		}
	};
	return {
		bind : bind
	};
});