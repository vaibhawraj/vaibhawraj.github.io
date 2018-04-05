//subscriber
"use strict";
define([],function(){
	var subscriber = function subscriber(sname,fn) {
		this.name = sname;
		this.onNotification = function(){ console.warn("onNotifiation method is not defined for " + this.name); };
		if(typeof fn == "function")
			this.onNotification = fn;
		this.notify = function(publisher,message){
			//Notify each subscriber
			console.debug(publisher.name + " sent a message ",message);
			this.onNotification(message);
		};

		this.subscribe = function(pub) {
			var isPublisher = typeof pub != "undefined" && pub.constructor.name == "publisher";
			if(isPublisher) {
				pub.addSubscriber(this);
			}
		};

		this.unsubscribe = function(pub) {
			var isPublisher = typeof pub != "undefined" && pub.constructor.name == "publisher";
			if(isPublisher) {
				pub.removeSubscriber(this);
			}
		};

	};
	return subscriber;
});