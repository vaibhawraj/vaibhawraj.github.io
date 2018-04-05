"use strict";
define([],function(){
	var directive = function(){
		return {
			//Here Go Directive Configuration
			restrict:'E',
			scope: {
				size:'=size'
			},
			templateUrl:'template/directive/spinnerTemplate.html'
		};
	};
	return directive;
});