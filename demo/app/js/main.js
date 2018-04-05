//This module initialize app after fulfilling all dependent requirement
"use strict";
define(['require','core/EventListener'],	//Why using require separetly, So that we can use conditional loading of module
	function(require,EventListener){

	//Do stuff to Initialize app environment if required

	//Bind app initialization to deviceready event
	EventListener.bind(["onLoad","deviceready"],function(){
		//Begin loading app after deviceready event
		window.isDeviceReady = true;
		require(['ui/sfdcApp'],function(){
			logger.info("App Initialize");
		});
	});
});