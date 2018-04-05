var gall = {
		cur:0,
		lis:null,
		index:0,
		width:0,
		show:function(i){
			gall.index = i;
			if(gall.index>=gall.lis.length)
				gall.index=0;
			else if(gall.index<0)
				gall.index=gall.lis.length-1;
			gall.lis.each(function(){
				$(this).css({
					'left': (gall.width/2) + (($(this).index() - gall.index) * 200),
					'margin-left': - $(this).width()/2,
					'transform': 'scale('+ 1 - 1/($(this).index() + gall.index) +')',
				});
			});
			
		}
	};
function init_gallery()
{
	gall.lis = $("#gallery > ul > li");
	gall.lis.click(function(){ $(this) });
	gall.width = $("#gallery").width();
	gall.show(0);

	
}
