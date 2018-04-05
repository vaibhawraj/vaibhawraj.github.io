//This script file is created by vaibs for letter animation
var la={
	g: null,
	g_text: null,
	NUM_CIRCLES: 500,
	RADIUS:4,
	bImageLoaded:false,
	WindX:Math.sin(Math.random()*360)*3,
	WindY:Math.cos(Math.random()*360)*3,
	caption:['c','h','r','o','u','s'],
	index:0,
	cap_image:new Array(),
	carray: new Array(),
	WIDTH:100,
	HEIGHT:100,
	TEXTURE_WIDTH:100,
	TEXTURE_HEIGHT:100,
	draw_timer:null,
	bFade:true,
	next_letter_timer:null,
	clear_letter_timer:null,
	x:250,
	y:300,
	letter_spacing:40,
	s:5,
	ds:0.1,
	done:0,
	aftereffect_timer: null,
	Circle:function circle(x,y,r)
	{
		this.x=x;
		this.y=y;
		this.r=r;
		this.destX=-1;
		this.destY=-1;
		this.alpha=0;
		this.vx=Math.random()-.5*5;
		this.vy=Math.random()-.5*5;
		this.draw = function() {
			C = this;
			la.g.globalAlpha=C.alpha;
			la.g.beginPath();
			//la.g.fillStyle = 'rgb('+ (100 + Math.floor(Math.random()*155)) + ',' +(100 + Math.floor(Math.random()*155))+','+(100 + Math.floor(Math.random()*155))+')';
			var grd=la.g.createRadialGradient(C.x,C.y,C.r/2,C.x,C.y,C.r);
			grd.addColorStop(0,"rgba(255,255,255,0.5)");
			grd.addColorStop(1,"rgba(0,0,255,0.01)");
			la.g.fillStyle=grd;
			la.g.arc(C.x, C.y, C.r, 0, Math.PI*2, true);
			la.g.closePath();
			la.g.fill();
		}
	},

	init: function(g1,g2)
		{
			la.g=$(g1)[0].getContext("2d");
			la.g_text=$(g2)[0].getContext("2d");
			la.WIDTH=$(g1).width();
			la.HEIGHT=$(g1).height();
			la.TEXTURE_WIDTH=$(g2).width();
			la.TEXTURE_HEIGHT=$(g2).height();
			/*
			for(var l=0;l<6;l++){
				la.cap_image[l]=new Image();
				la.cap_image[l].src="image/ch_0"+(l+1)+".jpg";
				}
			*/
			for(i=0;i<la.NUM_CIRCLES;i++)
				la.carray[i]=new la.Circle(Math.floor(Math.random()*la.WIDTH),Math.floor(Math.random()*la.HEIGHT),la.RADIUS);
			la.x = (la.WIDTH-(la.letter_spacing*la.s*la.cap_image.length))/2;
			la.draw_timer=setInterval(la.draw,30);	
		},
	
	draw: function()
		{
			if(!la.bImageLoaded){
				la.bImageLoaded=la.imagesLoaded();
				return;
			}
		//	la.setLetter(0,250,300,3);
		//	console.log("done");
			la.clear();
		
			for (i=0; i<la.carray.length; i++) {
				var C=la.carray[i];	
		
				if(C.destX>-1){
					C.x+=(C.destX-C.x)/4+((C.destX-C.x)/90 * C.vx)+la.WindX;
					C.y+=(C.destY-C.y)/4+((C.destY-C.y)/90 * C.vy)+la.WindY;
					C.alpha+=(.1-C.alpha)/2;
				}
				else{		
					C.x+=C.vx+la.WindX;
					C.y+=C.vy+la.WindY;
					if(la.bFade)
						C.alpha*=(.999+C.alpha)*.999;
					if(C.alpha<0)C.alpha=0;
				}
				la.WindX*=Math.random() * .9999;
				la.WindY*=.9999;
		
		
				if(C.x<0){C.x=-C.x;C.vx=-C.vx;}
				if(C.y<0){C.y=-C.y;C.vy=-C.vy;};
				if(C.x>la.WIDTH){C.x=la.WIDTH-(C.x-la.WIDTH);C.vx=-C.vx;}
				if(C.y>la.HEIGHT){C.y=la.HEIGHT-(C.y-la.HEIGHT);C.vy=-C.vy*.45;}
				C.draw();
			}
			//clearInterval(la.draw_timer);
		},
	imagesLoaded: function()
		{
			for(i=0;i<6;i++)
			{
				if(!la.cap_image[i].complete)
					return false
			}
			la.setNextLetter();
			setTimeout(function(){la.clear_letter_timer = setInterval(la.clearCircles,4000)},2500);
			la.next_letter_timer = setInterval(la.setNextLetter,4000);
			return true
		},
	clear: function()
		{
			la.g.globalAlpha=.05;
			la.g.fillStyle="black";
			la.g.fillRect(0,0,la.WIDTH,la.HEIGHT)
		},
	setLetter: function(index,x,y,s)
		{
			if(!(index>=0 && index<la.caption.length))
				return;
			la.g_text.fillStyle="#00000000";
			la.g_text.fillRect(0,0,la.TEXTURE_WIDTH,la.TEXTURE_HEIGHT);
			la.g_text.drawImage(la.cap_image[index],0,0);
			var imageData=la.g_text.getImageData(0,0,la.TEXTURE_WIDTH,la.TEXTURE_HEIGHT);
			var sqWidth=2;
			var nIndex=0;
			for(j=0;j<Math.floor(imageData.height);j=j+sqWidth)
					{
						for(i=0;i<Math.floor(imageData.width);i=i+sqWidth)
						{
						var nAvg=0;
						for(ypos=j;ypos<j+sqWidth;ypos++)
						{
							for(xpos=i;xpos<i+sqWidth;xpos++)
							{
								var index=(xpos*4)*imageData.width+(ypos*4);
								var red=imageData.data[index];
								var green=imageData.data[index+1];
								var blue=imageData.data[index+2];
								var alpha=imageData.data[index+3];
								var average=(red+green+blue)/3;
								nAvg+=average/(sqWidth*sqWidth)
							}
						}
						if(nAvg>100&&nIndex<la.carray.length)
						{
							la.carray[nIndex].destX=(j*s + x);//(j-Math.floor(sqWidth/2))*1+0;
							la.carray[nIndex].destY=(i*s + y);//(i-Math.floor(sqWidth/2))*1.5+0;
							nIndex++;
						}
						}
					}
			for(i=nIndex+1;i<la.carray.length;i++)
			{
				la.carray[i].destX=-1;
				la.carray[i].destY=-1;
			}
		},
	clearCircles: function()
		{
			la.WindX=Math.sin(Math.random()*360)*10;
			la.WindY=Math.cos(Math.random()*360)*10;
			for(i=0;i<la.carray.length;i++)
			{
				var nang=Math.random()*360;
				la.carray[i].vx=Math.sin(nang)*5;
				la.carray[i].vy=Math.cos(nang)*5;
				la.carray[i].destX=-1;
				la.carray[i].destY=-1;
			}
		if(la.index>la.cap_image.length){
			 	console.log("All done");
				clearInterval(la.draw_timer);
				clearInterval(la.next_letter_timer);
				clearInterval(la.clear_letter_timer);
				la.showWhole();
			}
		},
	setNextLetter: function()
		{
			la.setLetter(la.index,la.x + (la.index*la.letter_spacing*la.s),la.y,la.s);
			la.index++;
		},
	showWhole: function()
		{
			var i;
			la.g.globalAlpha=1;
			la.g.clearRect(0,0,la.WIDTH,la.HEIGHT);
			for(i=0;i<la.cap_image.length;i++)
			{
				la.setLetter(i,la.x + (i*la.letter_spacing*la.s),la.y,la.s);
				la.drawWholeCharacter();
			}
			//Callback Animation
			la.done = 1;
			mbc.init = setInterval(function(){
				if(mbc.ready==1)
				{
					init_magic();
					style();
					clearInterval(mbc.init);
				}
			},100);
			$("#a1").animate({"opacity":0},2000);
		},
	drawWholeCharacter: function()
		{
		for (i=0; i<la.carray.length; i++)
			{
			var C=la.carray[i];	
	
			if(C.destX>-1){
			la.g.beginPath();
			//la.g.fillStyle = 'rgb('+ (100 + Math.floor(Math.random()*155)) + ',' +(100 + Math.floor(Math.random()*155))+','+(100 + Math.floor(Math.random()*155))+')';
			var grd=la.g.createRadialGradient(C.destX,C.destY,C.r/2,C.destX,C.destY,C.r);
			grd.addColorStop(0,"rgba(255,255,255,0.5)");
			grd.addColorStop(1,"rgba(0,0,255,0.01)");
			la.g.fillStyle=grd;
			la.g.arc(C.destX, C.destY, C.r, 0, Math.PI*2, true);
			la.g.closePath();
			la.g.fill();		
			}
			}
		
		},
	aftereffect: function()
		{
			/*la.aftereffect_timer = setInterval(function(){
				la.effect(la.s);
				la.s = la.s+la.ds;
				if(la.s>1)
					{
					la.ds = la.ds * -1;
					la.s=1;
					}
				if(la.s<-1)
					{
					la.ds = la.ds * -1;
					la.s=-1;
					}
				
			},50);*/
			$("#a1").animate({"opacity":1},500);
			la.effect(1);
		},
	effect: function(e)
			{
				la.g.clearRect(0,0,la.WIDTH,la.HEIGHT);
//				la.g.scale(e,1);
				la.g.drawImage(imgAr[3],((la.WIDTH/2)-135),(la.HEIGHT)-200);
//				la.g.scale((1/e),1);
			}
};

function init_letter_anim()
{
	la.init('#a1','#a1_h');
}
