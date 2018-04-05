var pro = {
	carray : new Array(),
	g : null,
	g_text : null,
	text_height : 0,
	text_width : 0,
	height : 0,
	width : 0,
	temp : null,
	im_data : 0,
	noc : 0,
	draw_timer:null,
	init : function (g1,g2,image)
	{
		this.g = $(g1)[0].getContext("2d");
		this.g_text = $(g2)[0].getContext("2d");
		this.height = $(g1).height();
		this.text_height = $(g2).height();
		this.width = $(g1).width();
		this.text_width = $(g2).width();
		this.image = new Image();
		this.image.src = image; 
		this.temp = setInterval(function(){
				if(pro.image.complete){
					pro.g_text.drawImage(pro.image,0,0,pro.text_width,pro.text_height);
					pro.im_data = pro.g_text.getImageData(0,0,pro.text_width,pro.text_height);
					pro.carray[pro.noc] = new pro.circle(pro.width/2,pro.height/2,0,pro.width/2,pro.height/2,pro.width/2);
					pro.noc++;
					pro.draw_timer = setInterval(pro.draw,50);
					clearInterval(pro.temp);
					}
				},50);
	},
	circle : function (x0,y0,r0,x1,y1,r1)
	{
		this.x = x0;
		this.y = y0;
		this.r = r0;
		this.dx = x1;
		this.dy = y1;
		this.dr = r1;
		this.show = 1;
		var index = (Math.round(y1)*4)*pro.width + (Math.round(x1)*4);
		this.color = 'rgba(' + pro.im_data.data[index] + ',' + pro.im_data.data[index + 1] + ',' + pro.im_data.data[index+2] + ',' + pro.im_data.data[index+3] + ')';
	},
	draw : function ()
	{
		var i;
		pro.g.clearRect(0,0,pro.width,pro.height);
		for(i=0;i<pro.carray.length;i++)
		{
			var C=pro.carray[i];
			if(C.show==1)
			{
			C.r += (C.dr-C.r)/4;
			C.y += (C.dy-C.y)/4;
			C.x += (C.dx-C.x)/4;

			pro.g.globalAlpha=1;
			pro.g.beginPath();
			pro.g.fillStyle=C.color;
			pro.g.arc(C.x, C.y, C.r, 0, Math.PI*2, true);
			pro.g.closePath();
			pro.g.fill();
			}
		}
		var all=0;
		for(i=0;i<pro.noc;i++)
		{
			var C = pro.carray[i];
			if(C.show==1)
			{
				if(Math.round(C.x)!=Math.round(C.dx) || Math.round(C.y)!=Math.round(C.dy) || Math.round(C.r)!=Math.round(C.dr)) {all = 1; break;}
			}
		}
		if(all==0) pro.trigger();
	},
	trigger : function()
	{
		var n = pro.noc;
		for(i=0;i<n;i++)
		{
			var C = pro.carray[i];
			if(C.show==1)
			{
				if(C.r/2 >= 0.5)
				{
					pro.carray[pro.noc] = new pro.circle(C.x,C.y,C.r,C.x-(C.r/2),C.y-(C.r/2),C.r/2);
					pro.noc++;
					pro.carray[pro.noc] = new pro.circle(C.x,C.y,C.r,C.x+(C.r/2),C.y-(C.r/2),C.r/2);
					pro.noc++;
					pro.carray[pro.noc] = new pro.circle(C.x,C.y,C.r,C.x-(C.r/2),C.y+(C.r/2),C.r/2);
					pro.noc++;
					pro.carray[pro.noc] = new pro.circle(C.x,C.y,C.r,C.x+(C.r/2),C.y+(C.r/2),C.r/2);
					pro.noc++;
					C.show = 0;
				}
			}
		}
	}
};
function init_pro()
{
	pro.init("#m","#m_h","../image/main_bg.jpg");
}
