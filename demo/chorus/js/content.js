function fcontent()
{
	$('body').append('<div id="lb"></div>');
	var hash = window.location.hash.substr(1);
	var href = $('#menu li a').each(function(){
		var href = $(this).attr('href');
		if(hash.length==0)
		{
			
		}
		else if(hash==href.substr(0,href.length-4))
		{
			$('#menu li').css("font-weight","normal")
			var toLoad = hash+'.php #content_text>div';
			$(this).parent().css("font-weight","bold");
			$('#content_text').load(toLoad);
		}
	$('#sidemenu').css("left","-300px");
	$('#sidemenu').animate({"left":"0px"},700);
	$('#content_text').css({"top":"-800px","opacity":"0"});
	$('#content').css({"top":"300px","opacity":"0"});	
	$('#content_text').animate({"top":"0px","opacity":"1"},700);
	$('#content').animate({"top":"0px","opacity":"1"},700);
	});
	
	$('#menu li a').click(function(){
								  
		var toLoad = $(this).attr('href')+' #content_text>div';
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
		}
			window.location.hash =	 $(this).attr('href').substr(0,$(this).attr('href').length-4);
			$('#menu li').css("font-weight","normal");
			($(this).parent()).css("font-weight","bold");

		//function hideLoader() {
			//$('#load').fadeOut('normal');
		//}
		return false;
	});
}
