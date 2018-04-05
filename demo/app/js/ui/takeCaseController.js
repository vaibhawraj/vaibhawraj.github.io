"use strict";
define([],function(){
	var takeCaseController = function($scope, $rootScope, $state, activityId){
		$scope.activityId = activityId;
		$scope.init = function(){
			$scope.activity = $scope.activityList.find(function(activity){
				return activity.Id == activityId;
			});
		};
		$scope.init();
		$scope.cancel = function(){
			$scope.goPreviousPage('activityDetail',{
				id:$scope.activityId
			});
		};
		$scope.save = function(){
			$scope.goPreviousPage('activityDetail',{
				id:$scope.activityId
			});
		};
		$scope.subject="";
		$scope.description="";
	};
	return takeCaseController;
});
