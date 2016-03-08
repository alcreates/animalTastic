


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
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ tvShow +"&api_key=dc6zaTOxFJmzC&limit="+5;
	$.ajax({url: queryUrl, method : 'GET'})
		.done(function(response){
			var result = response.data;
			
                    


			for (var i = 0; i < result.length; i++) {
			var fixHgtURL = result[i].images.fixed_height.url;
            var stillURL = result[i].images.fixed_height_still.url;	

			var gifBox = $('<div>').text("rating:" + result[i].rating).attr('class','col-sm-3')
			var image = result[i].images.fixed_height.url;
			var tvShowimage = $("<img>");
			tvShowimage.attr('src', stillURL);
			tvShowimage.attr('alt', 'tv show');
			tvShowimage.attr('data-state','still');
			tvShowimage.attr('data-still',stillURL);
			tvShowimage.attr('data-animate', fixHgtURL);
			tvShowimage.attr('class','image')
			gifBox.append(tvShowimage);

			$('#mainDisplay').prepend(gifBox);

			}
			
			
			console.log(JSON.stringify(queryUrl))

		});
}

renderButtons();


function state(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state','still')
	}
}


$('#addButton').on('click',function(){

	var tvshow = $('#input').val().trim();
	$('#input').val('')
	tvShows.push(tvshow);
	renderButtons();
	

});

$(document).on('click','.tvshow', displayGif );
$(document).on('click','.image', state);



