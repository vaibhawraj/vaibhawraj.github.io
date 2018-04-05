var panel = { p1l:'',
	      p2l:'',
	      p1lo:'',
	      p2lo:'',
	      set:0,
	      ready:0,
	      init:0	
	};
function init_panel_float()
{
	$('#p1').css({
		'position':'fixed',
		'bottom':'0px',
		'left':'100px',
		'background-image':"url('image/ba1.png')",
		'height':'312px',
		'width':'215px',
		'background-size':'100% 100%',
		'opacity':'0'
	});
	$('#p2').css({
		'position':'fixed',
		'bottom':'0px',
		'left':screen.width-400,
		'background-image':'url(./image/ba2.png)',
		'height':'362px',
		'width':'265px',
		'background-size':'100% 100%',
		'opacity':'0'
	});
	$('#p1').animate({"opacity":'0.8'},1000);
	$('#p2').animate({"opacity":'0.8'},1000);
	panel.p1lo = parseInt($('#p1').css("left"));
	panel.p2lo = parseInt($('#p2').css("left"));
	$(document).mousemove(function(e){panel_float(e)});
	la.aftereffect();
}
function panel_float(e)
{
	scr_width = ($(document).width())/2;
	scr_height = ($(document).height())/2;
	var maxx = +100;
	var minx = 0;
	var maxx2 = -100;
	var minx2 = 0;
	panel.p1l = panel.p1lo + (maxx - (((maxx - minx)/scr_width)*e.pageX));
	panel.p2l = panel.p2lo + (maxx2 - (((maxx2 - minx2)/scr_width)*e.pageX));
	if(panel.set==0)
	{
		panel.set =  setInterval(function(){animate_panel()},50);
	}
}
function animate_panel()
{
	var p1il = parseInt($("#p1").css("left"));
	var p2il = parseInt($("#p2").css("left"));	
	if(p1il == panel.p1l)
	{
		clearInterval(panel.set);
	}
	else
	{
		    p1il = p1il + ((panel.p1l - p1il)/10);
		    p2il = p2il + ((panel.p2l - p2il)/10);
	}
	$("#p1").css("left",p1il);
	$("#p2").css("left",p2il);
}
