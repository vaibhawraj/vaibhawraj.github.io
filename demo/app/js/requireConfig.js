// For any third party dependencies, like jQuery, place them in the lib folder

//Configure loading modules
"use strict";
requirejs.config({
	baseUrl: 'js/',
	paths: {

		//Library
		"json" : "lib/requirejs/json",
		"text" : "lib/requirejs/text",
		"forcetk" : "lib/forcetk/forcetk",
		"jquery" : "lib/jQuery/jquery-2.1.1.min",
		"material" : "lib/materialize/materialize",
		"hammer" : "hammerjs",
		"velocity" : "velocity.min",
		"scrollFire" : "",
		//Angular
		"angular" : "lib/angular/angular.min",
		"angularRoute" : "lib/angular-ui/angular-ui-router.min",
		"angularAnimate" : "lib/angular/angular-animate.min",
		"logger" : "helper/logger",
		"chartjs" : "lib/chartjs/Chart",
		//JSON
		"productList" : "../json/product.json"
		
	},
	//Note : shim define dependency for Non-AMD Module, so for example, angular-aria depends on angular to be loaded first,
	shim: {
		
		'angularRoute' : {
			deps: ['angular','angularAnimate']
		},
		'angularAnimate' : {
			deps: ['angular']
		},
		'main' : {
			deps:['logger','jquery']
		},
		'ui/sfdcApp' : {
			deps:['angular','angularRoute']
		}
	}
});

//Load Main JS File to begin Initialize
require(['main'],function(){
		if(typeof cordova == "undefined") {
			console.log("Firing onLoad");
			var e = new Event("onLoad");
			document.dispatchEvent(e);
		}
});

//For Testing Purpuse
