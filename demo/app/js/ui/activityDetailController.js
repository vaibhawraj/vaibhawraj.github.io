"use strict";
define([],function(){
	var activityDetailController = function($scope, $rootScope, $state, activityId){
		$scope.activityId = activityId;
		$scope.init = function(){
			console.log("We have something here",$scope.activityList);
			$scope.activity = $scope.activityList.find(function(activity){
				console.log('Activity Id',activity.Id);
				return activity.Id == activityId;
			});
		};
		$scope.init();
		$scope.takeOrder = function(){
			$scope.goNextPage('takeOrder',{
				id:$scope.activityId
			});
		};
		$scope.takeShare = function(){
			$scope.goNextPage('takeShare',{
				id:$scope.activityId
			});
		};
		$scope.takeImage = function(){
			$scope.goNextPage('takeImage',{
				id:$scope.activityId
			});
		};
		$scope.takeCase = function(){
			$scope.goNextPage('takeCase',{
				id:$scope.activityId
			});
		};
	};
	return activityDetailController;
});
