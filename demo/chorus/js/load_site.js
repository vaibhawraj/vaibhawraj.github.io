var loader = {
		count:0,
		tcount:0,
		loader:null
	};
var image_list = [
	'image/main_bg.jpg',
	'image/ba1.png',
	'image/ba2.png',
	'chorus1.png',
	'Logo.png',
	'image/bg3.jpg',
	'image/bg4.jpg',
	'image/bg5.jpg',
	'image/bg6.jpg',
	'image/bg_2.jpg',
	'image/bg_main_top_left.jpg',
	'image/bg_main_top_right.jpg',
	'image/bottomright.png',
	'image/bg_woman.jpg',
	'image/content.png',
	'image/content-back.png',
	'image/menu-m.png',
	'image/menu-s-scale.png',
	'image/menu-s-scale-b.png',
	'image/hp_event.jpg',
	'image/hp_about.jpg',
	'image/hp_gallery.jpg',
	'image/hp_reg.jpg',
	'image/hp_credits.jpg',
	'image/dev1.jpg',
	'image/dev2.jpg'
];
var image_size = [
	219,
	191,
	114,
	28,
	22,
	6,
	16,
	15,
	12,
	18,
	10,
	8,
	21,
	26,
	239,
	8,
	8,
	126,
	110,
	144,
	146,
	61,
	59,
	77,
	60,
	60
];
var imgAr = new Array();
function init_loadsite()
{
	var i=0;
	for(var l=0;l<6;l++)
	{
		la.cap_image[l]=new Image();
		la.cap_image[l].src="image/ch_0"+(l+1)+".jpg";
		loader.tcount += 2;
	}
	for(i=0;i<image_list.length;i++)
	{
		imgAr[i] = new Image();
		imgAr[i].src=image_list[i];
		loader.tcount += image_size[i];
	}
	setInterval(updateLoading,50);
	loader.loader = $("<div></div>");
	$('body').append(loader.loader);
	loader.loader.css({'position':'fixed','top':'0px','left':'0px','height':'10px','background':'rgba(200,0,0,0.5)','width':'0%'});
}
function updateLoading()
{
	var i;
	loader.count=0;
	for(i=0;i<imgAr.length;i++)
	{
		if(imgAr[i].complete)
			loader.count = loader.count + image_size[i];
	}
	for(i=0;i<la.cap_image.length;i++)
	{
		if(la.cap_image[i].complete)
			loader.count = loader.count + 2;
	}
	if(imgAr[0].complete)
	{
		mbc.ready=1;
	}
	if(imgAr[1].complete && imgAr[2].complete)
	{
		panel.ready=1;
	}
	$("#load").html('Loading '+ Math.floor((loader.count*100)/loader.tcount) +'%');
	loader.loader.stop().animate({'width':Math.floor((loader.count*100)/loader.tcount) + '%'},'fast','linear');
	if(Math.floor((loader.count*100)/loader.tcount) == 100)
	{
	if(mbc.done==1)
	{
		$("#load").html("Enter Main Site");
		$("#load").css({"box-shadow":"0px 4px 4px 0px rgba(60,60,60,0.6) inset,0px -4px 4px 0px rgba(60,60,60,0.6) inset","cursor":"pointer"});
		$("#load").click(function(){location['href']="index.htm"});
	}
	else
	{
		$("#load").html("Please Wait");
		$("#load").css({"box-shadow":"0px 4px 4px 0px rgba(60,60,60,0.4) inset,0px -4px 4px 0px rgba(60,60,60,0.4) inset","cursor":"pointer"});
//		$("#load").click(function(){location['href']="index.htm"});
	}
	}	
}
