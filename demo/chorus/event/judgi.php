<?php
if($_SERVER['REQUEST_METHOD']=='GET')
{
	if($_GET['page']=='admad'){ ?>

	<div>
	<br><br>
	<h1>Ad Mad : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px"><ul>
		<li>Ad Strategy/Theme</li>
		<li>Creativity</li>
		<li>Clarity of Message/Idea</li>
		<li>Ad Enactment and Presentation</li>
		<li>Jingle/ Punch-line</li>
</ul>	</p>
	</div>	
	
	
<?php }	elseif($_GET['page']=='click'){ ?>

	<div>
	<br><br>
	<h1>Click It : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to pictures theme.
	</p>
	</div>	
	<?php }	elseif($_GET['page']=='futsal'){ ?>

	<div>
	<br><br>
	<h1>Futsal : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to judges of game.
	</p>
	</div>	
	


	
	
<?php }	elseif($_GET['page']=='dancing_events'){ ?>

	<div>
	<br><br>
	<h1>Mosaic Bolts : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Judge: MJ5(Winner India’s Dancing Star)
	</p><br><br>
	<h1>Prodigy : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Judge: MJ5(Winner India’s Dancing Star)
	</p>	
	</div>	
	<?php }	elseif($_GET['page']=='literary'){ ?>

	<div>
	<br><br>
	<h1>Clash Of titans : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to students correct answers.	</p>
<br><br>
	<h1>Quiz : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to correct answers given by users.<br><br>
	<h1>Board room Battle : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to perfomance judge will judge the perfomance.	</p>
<br><br>
	<h1>Jam : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to content of topic.</p>
<br><br>
	
	
<?php }	elseif($_GET['page']=='fine_arts'){ ?>

	<div>
	<br><br>
	<h1>Fine Arts : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	All Fine Arts judging criteria will be disclosed on spot.</p>
	</div>	
	
<?php }	elseif($_GET['page']=='filmvertoning'){ ?>

	<div>
	<br><br>
	<h1>Filmotonics : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to clip theme.	</p>
	</div>	
	


	
	
<?php }	elseif($_GET['page']=='lan_gaming'){ ?>

	<div>
	<br><br>
	<h1>Gonfle Gaming : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to Winner of game rounds.
	</p>	</div>	
	
<?php }	elseif($_GET['page']=='mr_chorus'){ ?>

	<div>
	<br><br>
	<h1>Mister and Miss Chorus 2014 : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Judge of the Event : Vina Kapoor<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
(According to respected judge of mr & mrs Chorus.)</p>
	</div>	
	
<?php }	elseif($_GET['page']=='rowdies'){ ?>

	<div>
	<br><br>
	<h1>Rowdies : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	Judging Criteria will be different for different round and will be disclosed on spot.
	</p>
</div>	
	
<?php }	elseif($_GET['page']=='treasure'){ ?>

	<div>
	<br><br>
	<h1>Treasure Hunt : Juding Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disclose on the spot. Have patience :)</p>
	</div>	
	
<?php }	elseif($_GET['page']=='nukkadnatak'){ ?>

	<div>
	<br><br>
	<h1>Nukkad Natak : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to perfomance and theme.	</p>
	</div>	
	

	

	
	
<?php }	elseif($_GET['page']=='stylefiesta'){ ?>

	<div>
	<br><br>
	<h1>Style Fiesta : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to theme representation.	</p>
	</div>	
	
<?php }	elseif($_GET['page']=='music_events'){ ?>

	<div>
	<br><br>
	<h1>Rap Wars : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to perfomance judge will judge the perfomance.
	</p><br><br>
	
	<h1>Battle of Bands : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to perfomance judge will judge the perfomance.
	</p><br><br>
	<h1>Solo Singing : Judging Criteria</h1>
	<p style="text-align:justify;word-spacing:7px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
According to perfomance judge will judge the perfomance.
	</p><br><br>
		</div>	
	
<?php }	else
	{
		header('location:index.php');
	}
}
else
{
		header('location:index.php');
}
?>
<!-- Author Vaibhaw Raj -->
