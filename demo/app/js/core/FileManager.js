/* This module depends on Cordova-file-plugin. It implements basic file ops like read, write & copy */
'use strict';
 define([],function(){
 	/*var errorCode = {
	 	"1":"NOT_FOUND_ERR",
		"2":"SECURITY_ERR",
		"3":"ABORT_ERR",
		"4":"NOT_READABLE_ERR",
		"5":"ENCODING_ERR",
		"6":"NO_MODIFICATION_ALLOWED_ERR",
		"7":"INVALID_STATE_ERR",
		"8":"SYNTAX_ERR",
		"9":"INVALID_MODIFICATION_ERR",
		"10":"QUOTA_EXCEEDED_ERR",
		"11":"TYPE_MISMATCH_ERR",
		"12":"PATH_EXISTS_ERR"};*/
	//@param  location    must be in format like file:///data/data kind of thing, must be directory
 	var read = function(location, filename, successCallback, errorCallback) {
 		logger.debug('IO','Reading database file');
 		window.resolveLocalFileSystemURL(location, function(dirEntry){
 			dirEntry.getFile(filename,{},function(fileEntry){
 				fileEntry.file(function(file){
	 					var reader = new FileReader();
	 					reader.onloadend = function(){
	 						console.log("Reading done");
	 						successCallback(reader.result);
	 					};
	 					reader.readAsDataURL(file);
	 					//reader.readAsBinaryString(file);
	 				}, function(err) {
	 					logger.error('IO','Error Reading database file',err);
	 					console.error("Error reading file",err);
	 					errorCallback(err);
	 				});
 			}, function(err) {
 				console.error('File not found',err);
 				errorCallback(err);
 			});
 		},function(err){
 			console.error('Got Error while trying to resolve  FileSystemUrl',location,err);
 		});
 	};

 	var readAsBinary = function(location, filename, successCallback, errorCallback) {
 		window.resolveLocalFileSystemURL(location, function(dirEntry){
 			dirEntry.getFile(filename,{},function(fileEntry){
 				fileEntry.file(function(file){
	 					var reader = new FileReader();
	 					reader.onloadend = function(){
	 						console.log("Reading done");
	 						var blob = new Blob([new Uint8Array(reader.result)]);
	 						successCallback(blob);
	 					};
	 					//reader.readAsDataURL(file);
	 					reader.readAsArrayBuffer(file);
	 				}, function(err) {
	 					logger.error('IO','Error Reading database file',err);
	 					console.error("Error reading file",err);
	 					errorCallback(err);
	 				});
 			}, function(err) {
 				console.error('File not found',err);
 				errorCallback(err);
 			});
 		},function(err){
 			console.error('Got Error while trying to resolve FileSystemUrl',location,err);
 			errorCallback(err);
 		});
 	};

 	var write = function(location, filename, content, successCallback, errorCallback) {
 		window.resolveLocalFileSystemURL(location, function(dirEntry){
 			dirEntry.getFile(filename,{create:true, exclusive:false},function(fileEntry){
 				fileEntry.createWriter(function(fileWriter){
 					fileWriter.onwriteend = function(){
 						console.log("Writing done",filename,"at",location);
 						successCallback();
 					};
 					fileWriter.onerror = function(err){
 						logger.error('IO','Error in writing file',err);
 						console.error("Error in writing file",err);
 						errorCallback(err);
 					};
 					fileWriter.write(content);
 				});
 			},function(err){
 				logger.error('IO','Error in creating file',err);
 				console.error('Unable to create file',filename,'at',location);
 				errorCallback(err);
 			});
 		},function(err){
 			logger.error('IO','Error while trying to resolve URL',location,err);
 			console.error('Got Error while trying to resolve  FileSystemUrl',location,err);
 			errorCallback(err);
 		});
 	};
 	var copy = function(sourceLocation, sourceFilename, destinationLocation, destinationFilename, successCallback, errorCallback){
 		console.log('Copying',sourceFilename,'from',sourceLocation,'to',destinationLocation,'as',destinationFilename);
 		//Get dir entry
 		readAsBinary(sourceLocation,sourceFilename,function(content){
 			write(destinationLocation,destinationFilename,content,function(){
 				logger.debug('IO','Copy successful');
 				successCallback();
 			},function(err){
 				logger.error('IO','Copy filed',err);
 				console.log('Copy failed', err);
 				errorCallback(err);
 			});
 		},function(err){
 			logger.error('IO','Read filed',err);
 			console.log('Read failed',err);
 			errorCallback(err);
 		});
 	};
 	return {
 		copy : copy,
 		read : read,
 		write : write,
 		readAsBinary : readAsBinary
 	};
 });