"use strict";
define(['core/SfDataManager'],function(sfDataManager){
	var activityListController = function($scope, $rootScope,$state){
		$scope.accountList = [];
		$scope.showSpinner = false;
		$scope.goDetailPage = function(activity){
			logger.debug('Activity Clicked',activity);
			$scope.goNextPage('activityDetail',{
				id : activity.Id
			});
		};
		$scope.checkThis = function(act){
			act.check = true;
			$scope.goDetailPage(act);
		};
		$scope.listA = [];
		$scope.listB = [];
		$scope.onTaskLoad = function(records){
			$scope.setLoadTask(false);
			$scope.setActivityList(records);
			if($scope.activityList.length > 0) {
				var toggle = true;
				$scope.activityList.forEach(function(act){
					if(toggle) {
						$scope.listA.push(act);
					}
					else {
						$scope.listB.push(act);	
					}
					toggle = !toggle;
				});
			}
			$scope.showSpinner = false;
			if(!$scope.$$phase) $scope.$apply();
		};
		$scope.onLoadFail = function(response){
			$scope.showSpinner = false;
			console.log(response);
		};
		$scope.init = function(){
			console.log('LoadTask',$scope.loadTask);
			$scope.listA = [];
			$scope.listB = [];
			if($scope.loadTask)	 {
				$scope.showSpinner = true;
				sfDataManager.getAllTask($scope.onTaskLoad, $scope.onLoadFail);
			} else {
				sfDataManager.getAllTask($scope.onTaskLoad, $scope.onLoadFail);
			}
		};
		$scope.init();
	};
	return activityListController;
});
