var mbc={
	width:'',
	height:'',
	i_w : '',
	i_h : '',
	col : 30,
	row : 30,
	ready:0,
	init:0,
	done:0
};	
function init_magic(){
	$("#main_bg").animate({'opacity':'1'},500);
	spread('#main_bg',mbc.row,mbc.col,100);

	//$("#main_bg_cover > div").mouseenter({col:mbc.col,i_w:mbc.i_w,i_h:mbc.i_h,radius:100},function(event){spread_block(event.data,$("#main_bg > div").eq($(this).index()));});
	$("#main_bg > div").css("opacity","0");
	//style();
}
function spread(elem,row,col,radius)
{
	var width=parseInt($(elem).css('width'));
	var height=parseInt($(elem).css('height'));
	var i_w = width/col;
	var i_h = height/row;	
	var inner='';
	mbc.width=width;
	mbc.height=height;
	mbc.i_w=i_w;
	mbc.i_h = i_h;
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
//	$(elem + " > div").mouseenter({col:col,i_w:i_w,i_h:i_h,radius:radius},function(event){spread_block(event.data,$(this));});
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
function style()
{
	var i=0;
	var k=0;
	var inter;
	var ele = [];
	var r=mbc.row;
	var c=0;
	inter=setInterval(function (){
			var data= {col:mbc.col,
				   i_w:(parseInt($("#main_bg").css('width'))/mbc.col),
				   i_h:(parseInt($("#main_bg").css('height'))/mbc.row),
				   radius:550};
			if(r<0) {
				//Next Frame Animation
				if(panel.ready==1)
				{
					mbc.done=1;
					init_panel_float();
					clearInterval(inter);
				}
				return;
			}
		//	console.log(i);
			for(var c=0;c<mbc.col;c++)
			{
				var id = r*mbc.col + c;
				if($.inArray(id,ele)==-1)
				{
				if(id>=0 && id<mbc.col*mbc.row)
				{
				$($("#main_bg>div").eq(id)).css("opacity","1");
				spread_block(data,$($("#main_bg>div").eq(id)));
				i=i+1;
				ele.push(id);
				}
				}
			}
			r=r-1;
			
		},150);
}
