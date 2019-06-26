var movies = ["Science-fiction", "Horror", "Action", "Fantasy", "Documentary", "Comedy", "Sport", "Anime", "Educational", "Matrix", "The Conjuring", "Titanic"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-movies", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}
renderButtons();

function submitButton() {
    var movie = $(this).attr("data-movies");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iFGpcsPo2GrEaaYwGdcvZVTa47JDHJY8&q=" +
        movie + "&limit=10&offset=0&rating=&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < 10; i++) {
            var moviesDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var moviesImage = $('<img class="gif">');
            moviesImage.attr("src", results[i].images.fixed_height_still.url);
            moviesDiv.append(p);
            moviesDiv.append(moviesImage);
            $("#gifs-appear-here").prepend(moviesDiv);
        }
    });
}

$("#select-movies").on("click", function(event) {
    event.preventDefault();
    var inputMovie = $("#movies-input").val().trim();
    movies.push(inputMovie);
    renderButtons();
});

$(document).on("click", ".movie", submitButton);

$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});