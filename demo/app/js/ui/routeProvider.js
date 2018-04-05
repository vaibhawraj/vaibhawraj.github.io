/*
 *   Modified By: Himanshu Maheshwari
 *   Purpose: For creating routes for new Event creation and modification
 *   Nee states added : 
 *   1.  newEventDetailView
 *   2.  newEvent
 */
'use strict';
define([],function(){
    var stateProvider =	function($stateProvider) {
    		  //Route Defination
			  $stateProvider
			  	.state('home',{
			  		cache:false,
			  		url:'/home',
			  		templateUrl:'template/home.html'
			  	})
			  	.state('offer',{
			  		cache:false,
			  		url:'/offer',
			  		templateUrl:'template/offer.html'
			  	})
			  	.state('myActivity',{
					cache:false,
			  		url:'/myActivity',
			  		templateUrl:'template/myActivity.html',
			  		controller:'activityListController'
			  	})
			  	.state('dashboard',{
					cache:false,
			  		url:'/dashboard',
			  		templateUrl:'template/dashboard.html',
			  		controller:'dashboardController'
			  	})
			  	.state('activityDetail',{
			  		cache:false,
			  		url:'/myActivity/acitivityDetail/:id',
			  		templateUrl:'template/acitivityDetail.html',
			  		controller:'activityDetailController',
			  		resolve:{
			  				activityId : function($q,$stateParams){
			  					///var deferred = $q.defer();
			  					var id = $stateParams.id;
			  					/*loger.info('Querying',id);
			  					window.setTimeout(function() {
			  						deferred.resolve();
			  					}, 10);
			  					SfDataManager.getRecord(sObjectName, id, function(record){
			  						deferred.resolve(record);
			  					},function(record){
			  						deferred.resolve(record);
			  					});
			  					return deferred.promise;*/
			  					return id;
			  				}
			  			}
			  	})
			  	.state('takeOrder',{
			  		cache:false,
			  		url:'/myActivity/acitivityDetail/:id/takeOrder',
			  		templateUrl:'template/takeOrder.html',
			  		controller:'takeOrderController',
			  		resolve:{
			  				activityId : function($q,$stateParams){
			  					///var deferred = $q.defer();
			  					var id = $stateParams.id;
			  					/*loger.info('Querying',id);
			  					window.setTimeout(function() {
			  						deferred.resolve();
			  					}, 10);
			  					SfDataManager.getRecord(sObjectName, id, function(record){
			  						deferred.resolve(record);
			  					},function(record){
			  						deferred.resolve(record);
			  					});
			  					return deferred.promise;*/
			  					logger.debug('State Param',id);
			  					return id;
			  				}
			  			}
			  	}).state('takeCase',{
			  		cache:false,
			  		url:'/myActivity/acitivityDetail/:id/takeCase',
			  		templateUrl:'template/takeCase.html',
			  		controller:'takeCaseController',
			  		resolve:{
			  				activityId : function($q,$stateParams){
			  					var id = $stateParams.id;
			  					return id;
			  				}
			  			}
			  	}).state('takeShare',{
			  		cache:false,
			  		url:'/myActivity/acitivityDetail/:id/takeShare',
			  		templateUrl:'template/takeShare.html',
			  		controller:'takeShareController',
			  		resolve:{
			  				activityId : function($q,$stateParams){
			  					var id = $stateParams.id;
			  					return id;
			  				}
			  			}
			  	}).state('takeImage',{
			  		cache:false,
			  		url:'/myActivity/acitivityDetail/:id/takeImage',
			  		templateUrl:'template/takeImage.html',
			  		controller:'takeImageController',
			  		resolve:{
			  				activityId : function($q,$stateParams){
			  					var id = $stateParams.id;
			  					return id;
			  				}
			  			}
			  	});

			  	/*.state('pinValidation',{
			  		cache:false,
			  		url:'/',
			  		templateUrl:'template/mPin.html',
			  		controller:'mpinController'
			  	})
			  	.state('listView',{
			  			cache: true,
			  			url:'/listView/:sobjectName',
			  			templateUrl:'template/listView.html',
			  			controller:'listviewController'
			  		})
			  	.state('detailView',{
			  			cache: true,
			  			url:'/detailView/:sobjectName/:rowid',
			  			templateUrl:'template/detailView.html',
			  			controller:'detailviewController',
			  			resolve:{
			  				sObject : function($stateParams){
			  					return configManager.getSobjectByName($stateParams.sobjectName);
			  				}
			  			}
			  		})
			  	/*.state('editView',{
			  		cache: false,
			  		url:'/editView/:sobjectName/:rowid/',
			  		templateUrl:'template/editView.html',
			  		controller:'editviewController',
			  		resolve:{
			  				record : function($q,$stateParams){
			  					var deferred = $q.defer();
			  					var sObjectName = $stateParams.sobjectName;
			  					var id = $stateParams.rowid;
			  					console.log('Querying');
			  					SfDataManager.getRecord(sObjectName, id, function(record){
			  						deferred.resolve(record);
			  					},function(record){
			  						deferred.resolve(record);
			  					});
			  					return deferred.promise;
			  				},
			  				sObject : function($stateParams){
			  					return configManager.getSobjectByName($stateParams.sobjectName);
			  				}
			  			}
			  		})*/
			  	/*.state('newEventDetailView',{
			  			cache: true,
			  			url:'/newEventDetailView/:sobjectName/:rowid',
			  			templateUrl:'template/newEventDetailView.html',
			  			controller:'newEventDetailViewController',
			  			resolve:{
			  				sObject : function($stateParams){
			  					return configManager.getSobjectByName($stateParams.sobjectName);
			  				}
			  			}
			  		})
			  	.state('newEvent',{
			  			cache: true,
			  			url:'/newEvent/:sobjectName',
			  			templateUrl:'template/newEvent.html',
			  			controller:'newEventController',
			  			resolve:{
			  				sObject : function($stateParams){
			  					return configManager.getSobjectByName($stateParams.sobjectName);
			  				}
			  			}
				});*/
		  //$urlRouterProvider.otherwise("/");
		};
	return stateProvider;
});