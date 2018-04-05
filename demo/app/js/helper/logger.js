/*
<<<<<<< HEAD
 *	Name : logger.js
 *	Description : Log Levels	Description
 					OFF			No Display
 					Error		Only Errors will be display
 					Warn		Warnings will be displayed
 					Debug		Debug
 					Info		Information Will be displayed
 					Log 		Log will be displayed
 					All

 */

"use strict";
define([],	//Why using require separetly, So that we can use conditional loading of module
	function(){
 		var log = function() {
			this.Level={
		 		OFF:0,
		 		ERROR:1,
		 		WARN:2,
		 		DEBUG:3,
		 		INFO:-1,
		 		LOG:5,
		 		ALL:6
		 	};
		 	this.LogLevel=this.Level.ALL;
		 	var that = this;
		 	this.parseError = function(){
		 		var err = Error();
		 		var stack = err.stack;
		 		var fname = stack.split('\n')[3];
		 		return fname.substr(fname.lastIndexOf('/')+1);
		 	};
		 	this.debug=function(){
		 		if(that.LogLevel >= that.Level.DEBUG) {
		 			var message = [];
		 			message.push('[Log ' + that.parseError() + ']');
		 			for(var i=0;i<arguments.length;i++){
		 				message.push(arguments[i]);
		 			}
		 			console.debug.apply(null,message);
		 		}
		 	};
		 	this.error=function(){
		 		if(that.LogLevel >= that.Level.ERROR) {
		 			var message = [];
		 			message.push('[Log ' + that.parseError() + ']');
		 			for(var i=0;i<arguments.length;i++){
		 				message.push(arguments[i]);
		 			}
		 			console.error.apply(null,message);
		 		}	
		 	};
		 	this.warn=function(){
		 		if(that.LogLevel >= that.Level.WARN) {
		 			var message = [];
		 			message.push('[Log ' + that.parseError() + ']');
		 			for(var i=0;i<arguments.length;i++){
		 				message.push(arguments[i]);
		 			}
		 			console.warn.apply(null,message);
		 		}	
		 	};
		 	this.info=function(){
		 		if(that.LogLevel == that.Level.INFO || that.LogLevel == that.Level.ALL) {
		 			var message = [];
		 			message.push('[Log ' + that.parseError() + ']');
		 			for(var i=0;i<arguments.length;i++){
		 				message.push(arguments[i]);
		 			}
		 			console.info.apply(null,message);
		 		}	
		 	};
		 	this.log=function(){
		 			var message = [];
		 			message.push('[Log ' + that.parseError() + ']');
		 			for(var i=0;i<arguments.length;i++){
		 				message.push(arguments[i]);
		 			}
		 			console.log.apply(null,message);
		 	};
		 	return this;
		 };
		 window.logger = new log();
		 return null;
	});
