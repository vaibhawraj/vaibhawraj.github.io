var dev = {
	names:['Vaibhaw Raj','Arpit Gupta','Praveen'],
	list:null,
	im_list:[
              '../image/dev1.jpg',
              '../image/dev2.jpg',
              '../image/ba1.png',	    
	],
	img_arr : new Array(),
	index:0,
	init:function()
	{
		dev.list = $("#container").children('ul').children('li');	
		for(var i=0;i<dev.list.length;i++)
		{
			dev.list.eq(i).css('z-index',i+1);
		}
		for(i=0;i<dev.im_list.length;i++)
		{
			dev.img_arr[i] = new Image();
			dev.img_arr[i].src = dev.im_list[i];
		}
	},
	show:function(i)
	{
		dev.index=i;
		for(var j=0;j<=i;j++)
		{
			dev.list.eq(j).animate({"margin-left":j*(100/i)},500);
		}
		for(var j=i+1;j<dev.list.length;j++)
		{
			var mar;
			var c = dev.list.length - i;
			mar = dev.list.eq(j).width() - (dev.list.length - j)*(250/c);
			dev.list.eq(j).animate({"margin-left":mar},500);
		}
		$("#name_tag").animate({"opacity":"0"},300,function(){$("#name_tag").html(dev.names[i]);$("#name_tag").animate({"opacity":"1"},300); });
		for(j=0;j<dev.list.length;j++)
			{
				var tmp = dev.list.eq(j).children('div').children('img');
				tmp.attr("src", n(dev.img_arr[j],"mono"));
			}
		dev.list.eq(i).children('div').children('img').attr("src", dev.img_arr[i].src);

	},
	image_load:function()
	{
		for(i=0;i<dev.img_arr.length;i++)
			if(!dedv.img_arr[i].complete)
				return false;
		return true;
	}
};
function init_dev()
{
	var i;
	dev.init();
	i=setInterval(function(){if(dev.image_load) { dev.show(0), clearInterval(i)}},100);
	$("#container > ul > li").click(function(){dev.show($(this).index())});
	$("#container > ul > li").hover(function(){
				var i = $(this).children("div").children("img");
				var index = $(this).index();
				if(dev.index==index)
					return;
				i.attr("src", n(dev.img_arr[index],"sepia"));
			},function(){
				var i = $(this).children("div").children("img");
				var index = $(this).index();
				if(dev.index==index)
					return;
				i.attr("src", n(dev.img_arr[index],"mono"));
			});
}
