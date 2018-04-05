var list = [];
var gl_i=0;
var globalint;
function init_float(){
	var t=new Date;
	var m=t.getMinutes();
	$('#c_list > li').each(function(){list.push($(this).css('background-image'));});
	if(m%list.length!=gl_i)
		{
			gl_i = m%list.length;
		}
	$('#carniv').css("background-image",list[gl_i]);
	spread('#chorus_logo',15,22,100);
	spread('#carniv',15,20,150);
	spread('#sharda_logo',10,20,150);
	globalint = setInterval(function(){console.log('h');change_image("style2");},5000);
//	$(document).click(function(){change_image("style2")});
	$("#sharda_logo").click(function(){window.location.href="http://www.sharda.ac.in";});
	$("#chorus_logo").click(function(){window.location.href="http://www.chorusfest.in";});
}
function spread(elem,row,col,radius)
{
	var width=parseInt($(elem).css('width'));
	var height=parseInt($(elem).css('height'));
	var i_w = width/col;
	var i_h = height/row;	
	var inner='';
	for(i=0;i<row*col;i++)
	{
		inner = inner + '<div></div>';
	}
	$(elem).html(inner);
	$(elem + " > div").each(function(){
		var i=$(this).index();
		var pos='-' + String(((parseInt(i%col))*i_w)) + 'px -' + String(((parseInt(i/col))*i_h)) + 'px';
		$(this).css({"position":"absolute","background":$(elem).css("background-image"),"height":i_h,"width":i_w,"background-position":pos,"top":((parseInt(i/col))*i_h),"left":((i%col)*i_w),"background-size":width+'px '+height+'px '});		
	});
	$(elem).css("background","none");
	$(elem + " > div").mouseenter({col:col,i_w:i_w,i_h:i_h,radius:radius},function(event){spread_block(event.data,$(this));});
}
function spread_block(event,e)
{
		var i=e.index();
		var col = event.col;
		var i_w = event.i_w;
		var i_h = event.i_h;
		var radius = event.radius;
		var top = (parseInt(i/col)*i_h);
		radius = 50 + Math.random()*radius;
		var left = ((i%col)*i_w);
		var top_c = top - radius + 2*(Math.random()*radius);
		var left_c = left - radius + 2*(Math.random()*radius);
		e.animate({"top":top_c,"left":left_c},500,function(){e.animate({"top":top,"left":left},500)});
}
function change_image(style)
{
		console.log('chimage');
		var t=new Date;
		var m=t.getMinutes();
		if(m%list.length!=gl_i)
		{
			gl_i = m%list.length;
			if(style=="style1")
			{
			$("#carniv>div").each(function(){
				var width=parseInt($("#carniv").css('width'));
				var height=parseInt($("#carniv").css('height'));
				var col = 20;
				var row = 15;
				var i_w = width/col;
				var i_h = height/row;
				var i=$(this).index();
				var radius = 250;
				var top = (parseInt(i/col)*i_h);
				radius = 50 + parseInt(Math.random()*radius);
				var left = ((i%col)*i_w);
				var top_c = top - radius + parseInt(2*(Math.random()*radius));
				var left_c = left - radius + parseInt(2*(Math.random()*radius));
				$(this).animate({"top":top_c,"left":left_c,"opacity":"0"},1000,function(){
						$(this).css("background-image",list[gl_i]);
						$(this).animate({"top":top,"left":left,"opacity":"1"},1500)
					});
				});
			}
		if(style=="style2")
			{
				var i=0;
				var k=0;
				var inter;
				var ele = [];
				var ro=0;
				var co=20;
				inter=setInterval(function (){
						var data= {col:20,
							   i_w:(parseInt($("#carniv").css('width'))/20),
							   i_h:(parseInt($("#carniv").css('height'))/15),
							   radius:250};
						if(k>30) return;
					//	console.log(i);
						for(var j=0;j<2;j=j+0.005)
						{
							var r = (ro - parseInt((k*Math.sin(j*Math.PI))));
							var c = (co + parseInt((k*Math.cos(j*Math.PI))));
							var id = r*20 + c;
							if($.inArray(id,ele)==-1)
							{
							if(id>0 && id<20*15)
							{
							spread_block(data,$($("#carniv>div").eq(id)));
							$("#carniv>div").eq(id).css("background-image",list[gl_i]);
							i=i+1;
							ele.push(id);
							}
							}
						}
						k=k+1;
						
					},50);
			}

		}
}
