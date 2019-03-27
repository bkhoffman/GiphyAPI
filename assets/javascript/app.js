$("button").on("click", function(){
  var game = $(this).attr("data-games");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  game + "&api_key=4lFSaa0iSlhmwIzo4zr2MBrI6tDZ2Ebh&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var results = response.data;

    results.array.forEach(element => {
      if(results(element).rating !== "r" && results(element).rating !== "pg-13"){
        console.log(element);
        var gifDiv = $("<div>");
        var rating = results(element).rating;
      }
      
    });
  });

});
