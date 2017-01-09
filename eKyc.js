  //Utility
        //App.
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
                    name : 'Populating Demographic Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Getting Customer Income Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Getting Cibil Score',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                },{
                    name : 'Saving Details',
                    currentState : $scope.UNPROCESSED,
                    inprogress : false
                }
            ];
            $scope.init = function(){
                $scope.showSection = true;
                //Prepare times
                $scope.aadharNumber = window.aadharNumber;
                $scope.fullName = '';
                $scope.dob = '';
                $scope.otp = '';

                //Button Flag
                $scope.isGetOtpDisabled = false;
                $scope.isValidateOtpDisabled = false;
                $scope.showResendOtp = false;
                
                //Show Panel Flags
                $scope.showEnterOtpCard = false;
                $scope.showStatus = true;
                $scope.showAadharDetailPanel = false;

                $scope.showGetOtpSpinner = false;
                $scope.showValidateSpinner = false;
                $scope.showDoneSpinner = false;
                $scope.showStatus = true;
                $scope.showEnterOtpCard = false;
                $scope.showAadharDetailPanel = false;
                $scope.isDoneDisabled = true;
                $scope.hasOTPError = false;
                $scope.initiateProcess(0);
                //Error Flag
                $scope.hasOTPError = false;
                $scope.apply();

                //Doc Selection
                $scope.docs = window.docs;
            }
            $scope.getOtp = function(){
                $scope.isGetOtpDisabled = true;
                $scope.showGetOtpSpinner = true;
                window.getOtpFromController($scope.otpSent);
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
                $scope.hasOTPError = false;
                console.log('OTP : ' + $scope.otp );
                //Otp Validation logic goes here
                var tOut = setTimeout(function(){
                    $scope.showValidateSpinner = false;
                    if($scope.otp == window.otp) {
                        $scope.validateOtpSuccessCallback();
                    } else {
                        $scope.invalidOtp();
                    }
                },2000);

            }
            $scope.validateOtpSuccessCallback = function(){
                console.log('Successfully Validated : Validated Found True');
                $scope.showStatus = true;
                $scope.showEnterOtpCard = false;
                $scope.showAadharDetailPanel = false;
                $scope.isDoneDisabled = true;
                $scope.hasOTPError = false;
                $scope.initiateProcess(0);
                $scope.apply();
            }
            $scope.invalidOtp = function(){
                $scope.hasOTPError = true;
                $scope.isValidateOtpDisabled = false;
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
                    },5000+Math.random()*3000);
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
            $scope.save = function(){
                $scope.isDoneDisabled = true;
                $scope.showDoneSpinner = true;
                window.customSave();
            }
            $scope.navigateTo = function(id){
                window.navigateTo(id);
            }
            $scope.docSave = function(){
               window.docs = $scope.docs;
                window.customSave();
            }
        });

        $(document).ready(function(){
            angular.bootstrap(document,["eKycApp"]);
        });
