<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Events | Chorus 2014</title>
  	<meta name="description" content="Chorus, the annual mega-cultural festival of Sharda University and one of the largest and the most glamorous fests of Northern India.">
	<meta name="author" content="Vaibhaw Raj">
	<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="../js/float.js"></script>
	<script type="text/javascript" src="../js/gallery.js"></script>
	<script type="text/javascript" src="../js/killercarousel.js"></script>
	<link rel="stylesheet" href="../css/header.css" type="text/css" charset="utf-8">
	<link rel="stylesheet" href="../css/gallery.css" type="text/css" charset="utf-8">
	<link rel="stylesheet" href="../css/sidemenu.css" type="text/css" charset="utf-8">
	<link rel="stylesheet" href="../css/killercarousel.css" type="text/css" charset="utf-8">
	<link rel="stylesheet" href="../css/about_unav_menu.css" type="text/css" charset="utf-8">
	<script>
$(function() {
		        $('.kc-wrap').KillerCarousel({
		            // Default natural width of carousel.
		            width: 1000,
		            // Item spacing in 3d (has CSS3 3d) mode.
		            spacing3d: 300,
		            // Item spacing in 2d (no CSS3 3d) mode. 
		            spacing2d: 520,
		            showShadow: true,
		            showReflection: true,
		            // Looping mode.
		            infiniteLoop: true,
		            // Scale at 75% of parent element.
		            autoScale: 65
		        });
            	});
$(document).ready(function(){init_float();

		setInterval(function(){$(".kc-wrap").children("div").eq(1).css("opacity","0");},10);		
		$("#sidemenu > #menu > ul > li").eq(0).css("font-weight","bold");
});</script>
</head>
<body>
  <div id="header_bg"><div id="tl"></div><div id="tr"></div></div>
  <div id="nav" style="padding:0px;margin:0px;height:130px;">

  	<div style="position:relative;width:0px;margin:auto;height:130px;">
		<div id="carniv"></div><ul id="c_list" style="display:none;"><li id="cl1"></li><li id="cl2"></li><li id="cl3"></li><li id="cl4"></li><li id="cl5"></li><li id="cl6"></li></ul>
		<div id="sharda_logo"><!--<a href="http://www.sharda.ac.in"><img src="Logo.png" alt="" style="height:auto;width:220px;"/></a>--></div>
		<div id="chorus_logo"><!--<a href=""><img src="chorus1.png" alt="" style="height:auto;width:220px;"/></a>--></div>
		<?php include "upper_nav.php";?>
	</div>
  </div>
  <div id="gallery">
	<div class = "kc-wrap">
               <div class="kc-item" style="background-image:url('../image/c2k13/im1.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>
               <div class="kc-item" style="background-image:url('../image/c2k13/im2.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>
               <div class="kc-item" style="background-image:url('../image/c2k13/im3.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im4.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im5.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im6.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im7.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im8.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>               <div class="kc-item" style="background-image:url('../image/c2k13/im9.jpg');background-position:center center;
    background-repeat:no-repeat;
    background-size:100% 100%;"></div>
        </div>
		<!--<li style="background:url('../image/main_bg.jpg')"></li>
		<li style="background:url('../image/main_bg.jpg')"></li>
		<li style="background:url('../image/main_bg.jpg')"></li>-->
  </div>
<br><br><br><br>
<div  id="footer" style="position:absolute;bottom:10px;width:100%;text-align:center;"><span style="text-align:center">Copyright @ Chorus 2014<br>.  .  .</span></div>
</body>
</html>
