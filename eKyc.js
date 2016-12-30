  //Utility
        //App
        var eKycApp = angular.module('eKycApp',[]);
        eKycApp.controller('eKycController',function($scope){
            $scope.SUCCESS = {icon:'success',color:'#4bc076',fill:'white',fontColor:'black'};
            $scope.FAILED = {icon:'error',color:'#e9696e',fill:'white',fontColor:'#e9696e'};
            $scope.UNPROCESSED = {icon:'record',color:'rgba(200,200,200,0.3)',fontColor:'rgba(100,100,100,0.7)'};
            $scope.statusCheckpoints = [
                {
                    name : 'Fetching Aadhar Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Fetching Demographic Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Fetching Bank Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Checking Credit Score',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                }
            ];
            $scope.init = function(){
                //Prepare times
                $scope.aadharNumber = '';
                $scope.fullName = '';
                $scope.dob = '';
                $scope.isGetOtpDisabled = false;
                $scope.showGetOtpSpinner = false;
                $scope.showValidateSpinner = false;
                $scope.showEnterOtpCard = false;
                $scope.showResendOtp = false;
                $scope.isValidateOtpDisabled = false;
                $scope.showStatus = false;
            }
            $scope.getOtp = function(){
                $scope.isGetOtpDisabled = true;
                $scope.showGetOtpSpinner = true;
                var tOut = setTimeout(function(){
                    $scope.otpSent();
                },2000);
                console.log(tOut);
            }
            $scope.otpSent = function(){
                $scope.isGetOtpDisabled = false;
                $scope.showGetOtpSpinner = false;
                $scope.showEnterOtpCard = true;
                $scope.showResendOtp = true;
                console.log('I am up again');
                $scope.apply();
            }
            $scope.validateOtp = function(){
                $scope.showValidatingOtpMessage = true;
                $scope.showValidateSpinner = true;
                $scope.isValidateOtpDisabled = true;
                console.log('OTP : ' + $scope.otp );
                //Otp Validation logic goes here
                var tOut = setTimeout(function(){
                    $scope.showValidateSpinner = false;
                    $scope.validateOtpSuccessCallback();
                },2000);

            }
            $scope.validateOtpSuccessCallback = function(){
                console.log('Successfully Validated : Validated Found True');
                $scope.showStatus = true;
                $scope.showEnterOtpCard = false;
                $scope.isDoneDisabled = true;
                $scope.initiateProcess(0);
                $scope.apply();
            }

            // Set of All Validation
            $scope.initiateProcess = function(statusCheckpointNo){
                if(statusCheckpointNo < $scope.statusCheckpoints.length) {
                    $scope.statusCheckpoints[statusCheckpointNo].inprogress = true;
                    setTimeout(function(){
                        $scope.statusCheckpoints[statusCheckpointNo].currentState = $scope.SUCCESS;
                        $scope.statusCheckpoints[statusCheckpointNo].inprogress = false;
                        statusCheckpointNo = statusCheckpointNo+1;
                        $scope.initiateProcess(statusCheckpointNo);
                    },1000+Math.random()*3000);
                } else {
                    $scope.isDoneDisabled = false;
                }
                $scope.apply();
            }

            $scope.cancel = function(){
                sforce.one.navigateToSObject(window.id);
            }
            $scope.apply = function(){
                if($scope.$$phase == null) {
                    $scope.$apply();
                }
            }
        });

        $(document).ready(function(){
            angular.bootstrap(document,["eKycApp"]);
        });
