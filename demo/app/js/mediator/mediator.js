//mediator.js
"use strict";
define([],function(){

	var mediator = function mediator(){
		this.channels = {};
		this.publish = function(channel){
			if(!this.channels[channel]) return false;
			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            	var subscription = this.channels[channel][i];
            	subscription.callback.apply(subscription.context, args);
	        }
	        return this;
		};
		//name - name of callback, any new subscriber with same name as of old, will be replaced
		this.subscribe = function(channel,name,fn){
			//If publisher exist with name "event", great add new subscriber with fn
			if(typeof fn == "undefined") {
				if(typeof name == "function") {
					fn=name;
					name=(new Date()).getTime(); //Will generate unique name based on time
				}
			}
			if(!this.channels[channel]) this.channels[channel] = [];
			//Check if subscriber already exists
			var existingSubscriber = this.channels[channel].find(function(subscriber){return (subscriber.name == name);});
			if(typeof existingSubscriber == "undefined")
				this.channels[channel].push({name:name,context:this,callback:fn});
			else
				existingSubscriber.callback = fn;
			return this;
		};
		this.installTo = function(obj) {
			obj.subscribe = this.subscribe;
			obj.publish = this.publish;
			obj.channels = {};
		};
	};
	return mediator;
});