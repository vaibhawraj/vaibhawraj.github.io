function fcontent()
{
	$('#loader').hide();
	addevents();
	$('body').append('<div id="lb"></div>');
	var hash = window.location.hash.substr(1);
	var hashfound = 0;
	$('#menu li').css("font-weight","normal");
	if(hash.length==0)
	{
		hash="admad";
		window.location.hash="#admad";
	}
	$('#menu li a').each(function(){
		var href = $(this).attr('href');
		if(hash==href.substr(10,href.length))
		{
			var toLoad = 'event.php?page='+hash;
			$('#content_text').load(toLoad);
			($(this).parent()).css("font-weight","bold");
			hashfound = 1;
			$('#about_event > ul > li').css({'font-weight':'normal','background':'rgba(127, 100, 38,0.3)'});
			$('#about_event > ul > li').eq(0).css({'font-weight':'bold','background':'rgba(127, 100, 38,0.7)'});	
		}
	$('#sidemenu').css("left","-300px");
	$('#sidemenu').animate({"left":"0px"},700);
	$('#content_text').css({"top":"-800px","opacity":"0"});
	$('#content').css({"top":"300px","opacity":"0"});	
	$('#content_text').animate({"top":"0px","opacity":"1"},700);
	$('#content').animate({"top":"0px","opacity":"1"},700);
	});
	if(hashfound==0)
	{
		location.hash='admad';
		location['href']='index.php';
		location.reload();
	}
	$('#menu li a').click(function(){
		$('#loader').show();
		var href=$(this).attr('href');		  
		var toLoad = 'event.php?page='+(href).substr(10,href.length);

		var top = parseInt($('#content').css("top"));	
		$('#content_text').animate({"top":"-800px","opacity":"0"},500,loadContent);
		$('#content').animate({"top":"300px","opacity":"0"},500);	
		function loadContent() {
				$('#content_text').load(toLoad,'',showNewContent);
		}
		function showNewContent() {
			var h =parseInt($("#content_text").css("height"));
				$('#content_text').animate({"top":"0px","opacity":"1"});
				$('#content').animate({"top":"0px","opacity":"1"},500);
				$('#loader').hide();
			$('#about_event > ul > li').css({'font-weight':'normal','background':'rgba(127, 100, 38,0.3)'});
			$('#about_event > ul > li').eq(0).css({'font-weight':'bold','background':'rgba(127, 100, 38,0.7)'});	
		}
			window.location.hash = href.substr(10,href.length);
			$('#menu li').css("font-weight","normal");
			($(this).parent()).css("font-weight","bold");

		//function hideLoader() {
			//$('#load').fadeOut('normal');
		//}
		return false;
	});
	$('.un').click(function(){
		$('#loader').show();
		var href=$(this).attr('href');		  
		var toLoad = 'event.php?page='+(href).substr(10,href.length);
		console.log((href).substr(10,href.length));
		var top = parseInt($('#content').css("top"));	
		$('#content_text').animate({"top":"-800px","opacity":"0"},500,loadContent);
		$('#content').animate({"top":"300px","opacity":"0"},500);	
		function loadContent() {
				$('#content_text').load(toLoad,'',showNewContent);
		}
		function showNewContent() {
			var h =parseInt($("#content_text").css("height"));
				$('#content_text').animate({"top":"0px","opacity":"1"});
				$('#content').animate({"top":"0px","opacity":"1"},500);
				$('#loader').hide();
				$('#about_event > ul > li').css({'font-weight':'normal','background':'rgba(127, 100, 38,0.3)'});
			$('#about_event > ul > li').eq(0).css({'font-weight':'bold','background':'rgba(127, 100, 38,0.7)'});	
		}
			window.location.hash = href.substr(10,href.length);
			$('#menu li').css("font-weight","normal");

		//function hideLoader() {
			//$('#load').fadeOut('normal');
		//}
		return false;
	});
		animateloader();	
}


function animateloader()
{
	$('#rc').css({'width':'0px','margin-left':'0px'});
	$('#rc').animate({'width':'50px','opacity':'1'},200,function(){
			$('#rc').animate({'width':'100px','opacity':'1'},200,function(){
				$('#rc').animate({'width':'50px','margin-left':'50px','opacity':'1'},200,function(){
					$('#rc').animate({'width':'0px','margin-left':'100px','opacity':'1'},200,function(){
						animateloader();
					});
				});
		});
	});
}
function addevents()
{
		$('#about_event > ul > li').click(function(){
		$('#loader').show();
		var href=window.location.hash.substr(1);
		var link=(($(this).html()).toLowerCase()).substr(0,5);
		if(link=='intro') link='event';		  
		var toLoad = link + '.php?page='+href;
		var e = $(this);
		var top = parseInt($('#content').css("top"));	
		$('#content_text').animate({"top":"-800px","opacity":"0"},500,loadContent);
		$('#content').animate({"top":"300px","opacity":"0"},500);	
		function loadContent() {
				$('#content_text').load(toLoad,'',showNewContent);
		}
		function showNewContent() {
			var h =parseInt($("#content_text").css("height"));
				$('#content_text').animate({"top":"0px","opacity":"1"});
				$('#content').animate({"top":"0px","opacity":"1"},500);
			$('#loader').hide();
			$('#about_event > ul > li').css({'font-weight':'normal','background':'rgba(127, 100, 38,0.3)'});
			$(e).css({'font-weight':'bold','background':'rgba(127, 100, 38,0.7)'});	

		}
		
		
		//function hideLoader() {
			//$('#load').fadeOut('normal');
		//}
	});
}
