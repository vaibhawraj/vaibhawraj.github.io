function adjustcss()
{
	var s_menu = $('#sidemenu');
	var cont = $('#content');
	var body = $('body');
	var m_height = s_menu.height();
	var c_height = cont.height();
	if(m_height > c_height)
	{
		if(body.scrollTop() + screen.availHeight > parseInt(cont.css('top')) + cont.height() +500)
		{
			cont.css('margin-top',(body.scrollTop() + screen.availHeight)-(parseInt(cont.css('top')) + cont.height() + 500) );
		}
		else
		{
			cont.css('margin-top','0px');
		}
			s_menu.css('margin-top','0px');
	}
	else if(m_height < c_height)
	{
		if(body.scrollTop() + screen.availHeight > parseInt(s_menu.css('top')) + s_menu.height() + 300)
		{
			s_menu.css('margin-top',(body.scrollTop() + screen.availHeight)-(parseInt(s_menu.css('top')) + s_menu.height() + 300) );
		}
		else
		{
			s_menu.css('margin-top','0px');
		}
		cont.css('margin-top','0px');
	}
}

