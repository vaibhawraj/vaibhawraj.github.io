"use strict";
define([],function(){
	var takeOrderController = function($scope, $rootScope, $state, activityId){
		$scope.activityId = activityId;
		$scope.orderedProductList = [];
		$scope.activeProduct = -1;
		$scope.isProductAdded = function(Id) {
			var index = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			if(index === -1) {return false;}
			return $scope.orderedProductList[index].isSelected;
		};
		$scope.showBody = function(Id){
			if($scope.activeProduct === Id){
				return {"display":"block"};
			}
			return {"display":"none"};
		};
		$scope.markActive = function(Id){
			if($scope.activeProduct !== Id) {
				$scope.activeProduct = Id;
			}
		};
		$scope.getTotalPrice = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var total = 0;
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				total = $scope.orderedProductList[productIndex].salesPrice * $scope.orderedProductList[productIndex].quantity;
			}
			return total;
		};
		$scope.getQuantity = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var q = 0;
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				q = $scope.orderedProductList[productIndex].quantity;
			}
			return q;
		};
		$scope.addProduct = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex === -1) {
				var oplEntry = {
					productId : product.Id,
					quantity : product.quantity,
					salesPrice : product.salesPrice,
					unitPrice : product.unitPrice,
					mrp : product.mrp,
					isSelected : true
				};
				$scope.activeProduct = -1;
				$scope.orderedProductList.push(oplEntry);
			} else {
				if(!$scope.orderedProductList[productIndex].isSelected) {
					$scope.orderedProductList[productIndex].isSelected = true;
					$scope.orderedProductList[productIndex].quantity = product.quantity;
					$scope.activeProduct = -1;
				}
			}
		};
		$scope.removeQuantity = function(Id){
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1) {
				product.quantity =  parseInt(product.quantity,10) - 1;
				if(product.quantity < 0) {
					product.quantity = 0;
				}
				if(product.quantity == 0) {
					$scope.removeProduct(Id);
				}
				var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
				if(productIndex !== -1){
				$scope.orderedProductList[productIndex].quantity = product.quantity;}
			}
		};
		$scope.addQuantity = function(Id){
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1) {
					product.quantity = parseInt(product.quantity,10) + 1;
					if(product.quantity > 0) {
						$scope.addProduct(Id);
					}
					var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
					$scope.orderedProductList[productIndex].quantity = product.quantity;
			}			
		};
		$scope.updateQuantity = function(Id){
			var product = $scope.productList.find(function(pd){return pd.Id === Id;});
			if(productIndex !== -1 && $scope.orderedProductList[productIndex].isSelected) {
				product.quantity = parseInt(product.quantity);
				if(product.quantity < 0) {
					product.quantity = 0;
				}
				if(product.quantity == 0) {
					$scope.removeProduct(Id);
				} else {
					$scope.addProduct(Id);
				}
				var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
				if(productIndex !== -1){
					$scope.orderedProductList[productIndex].quantity = product.quantity;
				}
			}
		};
		$scope.showDeleteButton = function(Id){
			return $scope.isProductAdded(Id);
		};
		$scope.removeProduct = function(Id){
			var productIndex = $scope.orderedProductList.findIndex(function(opl){return opl.productId === Id;});
			if(productIndex !== -1) {
				if($scope.orderedProductList[productIndex].isSelected) {
					$scope.orderedProductList[productIndex].isSelected = false;
				}
			}
		};
		$scope.getTotalProducts = function(){
			var len = 0;
			$scope.orderedProductList.forEach(function(opl){if(opl.isSelected){len = len+1;}});
			return len;
		};
		$scope.getTotalAmount = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * opl.salesPrice);
				}
			});
			return total;
		};
		$scope.getMyProfit = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * (opl.salesPrice - opl.unitPrice));
				}
			});
			return total;
		};
		$scope.getShopOwnerMargin = function(){
			var total = 0;
			$scope.orderedProductList.forEach(function(opl){
				if(opl.isSelected) {
					total = total + (opl.quantity * (opl.mrp - opl.salesPrice));
				}
			});
			return total;
		};
		$scope.init = function(){
			$scope.activity = $scope.activityList.find(function(activity){
				return activity.Id == activityId;
			});
			$scope.productList.forEach(function(product){
				product.quantity = 0;
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
		$scope.getPicture = function(fname){
			var dummyPayTMFile = "iVBORw0KGgoAAAANSUhEUgAAAJcAAABLCAMAAABKveUfAAAAk1BMVEX///8FLnABuvIAuPIAtvIAKm4ALG+l3/hDSn0AJGwvQHnz9Pc+wPOO1PdRx/Tx8fRuzvW85PpkcpkAAF3q+P0AG2gmN3WWnbX2/P7o6/AADmRue54AAGEWMXIAGGcAE2XCxdO4uss4ToEAH2nZ8fwACGPP0dykp73N7PuwssXg4ulJWokAAFYAsPE4RnyCi6paZY9hl7YXAAAC2ElEQVRoge2Y25KiMBBAgxA0yig6oIgXQNQBHMH//7rtpAMi4+xFV9itynmwOk3QUw3pgIQoFAqFQqFQKBQKxf/LvmuB+9hGv2uFe9iG/ta1wx2mRu9f9AKtV3lNKkZeMzkqxyMxvB7iBzxnaoMWeHkeP9PhQOAk/QS/aT/t7z3yGJfP95L1ZpVhcvW+FvibWSgSOT/+GUEU8fmfAyjV2eBW4KUbZ90TY+Pcc8YGx4aExYPeg6tiQLUKM96ixqlMUrZe8XLNTRi4Cwg/XD5xOCJ9tEJ0h/R1GcrPN3ncGD/txT2WN15AUHz1otxLb3jVPSs/HtjPe2lu0fTS4qzutfhdrytG8rwXzb94BemTXg8VDL3Y4eCLwNzwC1ngYlhjvYr7XuV939Ph9q68YFAKG+UE61Evdjkewx2tvCSTDddhs7v3F0mSxBI/aycJ7JHoBU3DsVHMcshUf9KLL7p02/QiQ/oTL2CMKiKWXhA5WK0phKj497wm0aIoihnT/tTL4F76q7wK348ZoD3m9ap6nbb1JVp5iVkr1qbXbJllFya9ihst7uXNcdXmeS5q2JaXZlIaM9knJqbZ9CI7bGgwTWvVSzOlDB2SY4A6221sll6ia9W6b2teJfGMRD7apOmCyv5FRq7ZqZcZZCQS9Yr5I89O9i9CjgfWoRfzU4JeZsOLZPk2cF0XL21rXswHAnYKyXdeULJ0AYgtoLU+AfsjgE+r33kh7ffVEry/3JBc90cgCwXRrtV61b1CHxvZYDCkWuXlHnxxrUUKn9Ja9spi2cpkE0WvuN4oykvbqhfJb1ua9KqnDmEXXuH7L7zcC3m5V85gC4pvvEgauPTKOuU5l5oIZX6p9Uqv2WY+n9OP2+SyyIcVC5HamRuBNj9F1Tzb0OGtFr0S3bIsoeChLn8L6vd48qEXtesb/g1eSTleSkb1SXtO/QyMxF8CjaRCoVAoFAqFQqFQdMIPfNlNr1T+oNcAAAAASUVORK5CYII=";
			if(typeof(navigator.camera)!=="undefined") {
						logger.info('Camera Plugin Ddetected');
						var options = {
							quality:30,
							destinationType:navigator.camera.DestinationType.DATA_URL,
							sourceType:navigator.camera.PictureSourceType.CAMERA,
							cameraDirection:navigator.camera.Direction.BACK,
							encodingType:navigator.camera.EncodingType.JPEG,
							targetWidth:400,targetHeight:600
						};
						logger.info('Setting Option for Camera. Opening Camera');
						navigator.camera.getPicture(function(iD){
							$scope.successCallback(iD,fname);
						},
								$scope.errorCallback,
								options
							);
					} else {
						logger.warn('Navigator is not defined');
						logger.info('Adding dummy image');
						$scope.successCallback(dummyPayTMFile);
					}
		};
		$scope.successCallback = function(imageData,fname){	//Base64 data
				logger.info('Success Call back for pic');
				logger.info('Image Data',imageData);
				var doc = fname;
				var attachmentRec = {Body:imageData,ContentType:'image/jpeg;base64',Name:doc+'.jpeg'};
				/*var image = {
					record : attachmentRec,
					uploaded : false,
					success : false
				}*/
				if(typeof($scope.activityId)!=='undefined' && $scope.activityId !== null) {
					//image.record.ParentId = $scope.activityId;
					attachmentRec.ParentId = $scope.activityId;
					//$scope.imageList.push(image);
					sdm.insertAttachment(image.record,function(response){
						/*image.uploaded = true;
						image.success = true;
						if($scope.$$phase === null){
							$scope.$apply();
						}*/
					},
					function(response){
						console.log(response);
						/*image.success = false;
						image.uploaded = true;
						if($scope.$$phase === null){
							$scope.$apply();
						}*/	
					});
				}
				if($scope.$$phase === null){
						$scope.$apply();
				}
			};
		$scope.errorCallback = function(message){
				logger.error(message);
				if($scope.$$phase === null){
						$scope.$apply();
				}
			};
	};
	return takeOrderController;
});
