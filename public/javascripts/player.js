$(document).ready(function() {
	ping_interval = false;
	slide = false;
	$('.button').click(function() {
		$.ajax({
		  url: $(this).attr('href'),
		  type: "PUT",
		  dataType: "script",
		});
		return false;
	});
	$('#volume_toggle').click(function() {
		$('#volume_container').toggle('slow');
		return false;
	});
	$('#song_slider').slider({
		min: 0,
		max: $('#song_slider').attr('data-max'),
		value: $('#song_slider').attr('data-value'),
		slide:  function(event,ui){
			clearInterval(ping_interval);
			slide=true;
		},
		change: function(event, ui){
			if(slide){
				$.ajax({
				  url: "/player/seek",
				  type: "PUT",
				  dataType: "script",
				  data: {time: ui.value}
				});
				ping_interval = setInterval('ping()',1000);
				slide = false;
			}
		}
	});
	$("#volume_slider").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: $('#volume_slider').attr('alt'),
		change: function(event, ui) {
			$.get('/player/volume?volume='+ui.value);
		}
	});
	ping_interval = setInterval('ping()',1000);
});
function ping(){
	$.ajax({
	  url: '/player/ping',
	  type: "GET",
	  dataType: "script",
	});
}