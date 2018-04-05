//publisher
"use strict";
define([],function(){
	var publisher = function publisher(pname) {
		var subscriberList = [];
		this.name = pname;
		this.publish = function(message){
			//Notify each subscriber
			var that = this;
			subscriberList.forEach(function(subscriber){
				subscriber.notify(that,message);
			});
		};

		this.addSubscriber = function(subsc) {
			var isSubscriber = typeof subsc != "undefined" && subsc.constructor.name == "subscriber";
			if(isSubscriber) {
				var alreadyExists = (subscriberList.indexOf(subsc) >= 0);
				if(!alreadyExists) {
					subscriberList.push(subsc);
					console.debug(subsc.name + " is added to publisher " + this.name);
				} else {
					console.warn(subsc.name + " already exists in publisher " + this.name);
				}
			}
		};

		this.removeSubscriber = function(subsc) {
			var isSubscriber = typeof subsc != "undefined" && subsc.constructor.name == "subscriber";
			if(isSubscriber) {
				var indexOf = subscriberList.indexOf(subsc);
				var isSubExists = (indexOf >= 0);
				if(isSubExists) {
					subscriberList.splice(indexOf,1);
					console.debug(subsc.name + " is removed from publisher " + this.name);
				} else {
					console.warn(subsc.name + " doesn't exists publisher " + this.name);
				}
			}
		};

	};
	return publisher;
});