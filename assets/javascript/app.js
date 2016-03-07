


var tvShows = ["house of cards", "game of thrones", "breaking bad", "mr.robot"]


function renderButtons(){
	$('#topDisplay').empty();
	for (var i = 0; i <  tvShows.length; i++) {
 		var a = $('<button>');
 		a.addClass('tvshow');
 		a.attr('data-name', tvShows[i]);
		a.text(tvShows[i]);
 		$('#topDisplay').append(a);

	
	}

}



function displayGif(){
	var tvShow = $(this).attr('data-name');
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ tvShow +"&api_key=dc6zaTOxFJmzC ";
	$.ajax({url: queryUrl, method : 'GET'})
		.done(function(response){

			var image = response.data[0].images.fixed_height.url;
			var tvShowimage = $("<img>");
			tvShowimage.attr('src', image);
			tvShowimage.attr('alt', 'tv show');

			$('#mainDisplay').prepend(tvShowimage);
			
			console.log(JSON.stringify(queryUrl))

		});
}

renderButtons();


$('#addButton').on('click',function(){

	var tvshow = $('#input').val().trim();
	tvShows.push(tvshow);
	renderButtons();
	

});

$(document).on('click','.tvshow', displayGif );




