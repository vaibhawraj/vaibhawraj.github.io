$(document).ready(function(){
	init_wave();
});
function init_wave()
{
	$('#frame').css({'top':($('body').height()/2),'left':($('body').width()/2)});
	wavelet('#frame',60,100);//6   10
}
function wavelet(elem,row,col)
{
	var bg_img = $(elem).css('background-image');
	var i;
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
	$(elem + ">div").each(function(){
		var i=$(this).index();
		var pos='-' + String(((parseInt(i%col))*i_w)) + 'px -' + String(((parseInt(i/col))*i_h)) + 'px';
		$(this).css({"position":"absolute","background":$(elem).css("background-image"),"height":i_h,"width":i_w,"background-position":pos,"top":((parseInt(i/col))*i_h),"left":((i%col)*i_w),"background-size":width+'px '+height+'px ',"-webkit-transition":"-webkit-transform 0.5s"});		
	});
	$(elem + ">div").mouseenter(function(){
		var e=$(this);
		var i=$(this).index();
		var i_r = parseInt(i/col);
		var i_c = parseInt(i%col);
		var r=10;
		var mag=2;
		var m_d=(mag-1)/r; //(mag - 1)/r
		function prop_wave(i_r,i_c,mag,k)
		{
			for(var j=0;j<2;j=j+(2/15))
			{
					var id = (i_r + parseInt((k*Math.sin(j*Math.PI))))*col + (i_c + parseInt((k*Math.cos(j*Math.PI))));
					var e2 = $(elem+">div").eq(id);
					o_wave(e2,mag);
			}
			if(mag<=1)
				return;
			setTimeout(function(){prop_wave(i_r,i_c,mag-m_d,k+1);},100);
		}
		prop_wave(i_r,i_c,mag,2);
		o_wave(e,mag);
		function o_wave(e,mag)
		{
		e.css({"-webkit-transform":"scale("+mag+")"});
		setTimeout(function(){e.css({"-webkit-transform":"scale(1)"})},300);
/*		e.css({"opacity":"0.5"});
		setTimeout(function(){e.css({"opacity":"1"})},700);*/
		}
		//,1000,function(){$(this).animate({"-webkit-transform":"scale(1)"},500)});
	});
}
