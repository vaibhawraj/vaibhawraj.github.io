//Angular App configuration
"use strict";
define([
	'ui/routeProvider',
	'ui/mainController',
	'ui/activityListController',
	'ui/activityDetailController',
	'ui/takeOrderController',
	'ui/takeShareController',
	'ui/takeImageController',
	'ui/takeCaseController',
	'ui/dashboardController',
	'ui/spinnerDirective' 
	],function(stateProvider,
		mainController,
		activityListController,
		activityDetailController,
		takeOrderController,
		takeShareController,
		takeImageController,
		takeCaseController,
		dashboardController,
		spinnerDirective){
	//define Angular App
	logger.info("Creating sfdcApp Angular Module");

	var app = angular.module('sfdcApp',['ui.router','ngAnimate']);
	
	//Defination of all controller related to this module
	app.controller('mainController',mainController)
	   .controller('activityListController',activityListController)
	   .controller('activityDetailController',activityDetailController)
	   .controller('takeOrderController',takeOrderController)
	   .controller('takeShareController',takeShareController)
	   .controller('takeImageController',takeImageController)
	   .controller('takeCaseController',takeCaseController)
	   .controller('dashboardController',dashboardController);
	
	//Route Provider
	app.config(stateProvider);
	
	//Platform Specific configuration
	app.directive('spinner', spinnerDirective);
	angular.bootstrap(document,['sfdcApp']);
	logger.info("Core","App initialized");
	return app;
});