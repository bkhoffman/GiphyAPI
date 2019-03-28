var games = ["Mario Bros", "Pac Man"];

//on click of Submit, adds game to empty array then calls addButton function to create button
$("#addGame").on("click", function(event){
  event.preventDefault();
  var newGame = $("#game-input").val().trim();
  console.log(newGame);
  games.push(newGame);
  console.log(games);
  addButtons();
});
//remove the last game in array
$("#removeGame").on("click", function(event){
  event.preventDefault();
  var removeGame = $("#game-input").val().trim();
  games.pop(removeGame);
  $("#gifs").empty();
  addButtons();
});

//loops through the games array and creates button for each game added. assigns class, 
//data-name and text to button and then appends to button row div
function addButtons(){
  $("#button-row").empty();
  for(var i = 0; i < games.length; i++){
    var gameButton = $("<button>");
    gameButton.addClass("game-btn");
    gameButton.attr("data-name", games[i]);
    gameButton.text(games[i]);
    $("#button-row").append(gameButton);
  }
};
addButtons(); //show the first 2 games already in the array
//on click of any game-btn class, calls displayGameInfo function. Adds game name to API search request
$(document).on("click", ".game-btn", displayGameInfo);
function displayGameInfo(){
  $("#gifs").empty();
  var game = $(this).attr("data-name");
  console.log(game);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  game + "&api_key=4lFSaa0iSlhmwIzo4zr2MBrI6tDZ2Ebh&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var results = response.data;
    //loop through response data and checks rating. Add new div/p/img tags for gifs. Appends gif and info
    for (var i = 0; i < results.length; i++){
      if(results[i].rating !== "r" && results[i].rating !== "pg-13"){
        var gifDiv = $("<div1>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifImg = $("<img>");
        
        gifImg.attr("src", results[i].images.fixed_height_still.url); //added the still image for initial gif
        gifImg.attr("data-state", "still"); //added the state
        gifImg.attr("data-still", results[i].images.fixed_height_still.url); //added the still image
        gifImg.attr("data-animate", results[i].images.fixed_height.url); //added the animated image
        gifImg.addClass("gifImage")

        gifDiv.append(gifImg);
        gifDiv.append(p);
        $("#gifs").append(gifDiv);
      }
    }
  });
};

$(document).on("click", ".gifImage", function() {
  console.log("clicked")
  var state = $(this).attr("data-state");
  console.log("data-state: ", state);
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
