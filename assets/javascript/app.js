var topics = ["Goku", "Gohan", "Vegeta", "Trunks", "Krillin", "Frieza", "Kid Buu", "Shenron"]
$("#buttonsRow").empty();
for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("gifButton btn btn-primary m-1");
    newButton.attr("data-name", topics[i]);
    newButton.text(topics[i]);
    $("#buttonsRow").append(newButton);
}
var searchID
var queryURL
var offset = 0

function setCharAt(str, index, char) {
    if (index > str.length-1) return str
    return str.substr(0, index) + char + str.substr(index+1)
}

function addButton(event) {
    event.preventDefault()

    var replaceID = ($("#gifInput").val()).charAt(0).toUpperCase() + ($("#gifInput").val()).slice(1)

    for (let i = 0; i < replaceID.length; i++) {
        if (replaceID.charAt(i) === ' ') {
            var replaceIndex = i+1
            var replaceLetter = replaceID[replaceIndex].toUpperCase()
            replaceID = setCharAt(replaceID, replaceIndex, replaceLetter)
        }        
    }

    var newButton = $("<button>")
    newButton.addClass("gifButton btn btn-primary m-1")
    newButton.attr("data-name", replaceID)
    newButton.text(replaceID)
    $("#buttonsRow").append(newButton)
}

function addMore() { 
    offset += 10
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8lVohNW4hK6A4MpwDklFpubAMw0btVzG&limit=10&rating=PG&lang=en&q=" + searchID + "&offset=" + offset

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
            var newDiv = $("<div class='col text-center mt-3 gif'>")
            var newGIF = response.data[i].images.downsized_still.url
            var newImage = $("<img class='gifImage' alt=''>").attr({
                src: newGIF,
                "data-still": newGIF,
                "data-animate": response.data[i].images.downsized.url,
                "data-state": "still",
                "data-position": offset + i,
            })
            var newRating = $("<p class='text-center pt-2'>").text("GIF Rating: " + response.data[i].rating.toUpperCase())
            var favButton = $("<button class='btn btn-primary favorite'>").text("Favorite")

            newDiv.append(newImage)
            newDiv.append(newRating)
            newDiv.append(favButton)
            $("#gifRow").append(newDiv)
        }
        console.log(response.data)
    })
}

function addFavorite() {
    var favoriteDiv = $(this).parent()[0]
    var copyDiv = $(favoriteDiv).children().slice(0, 2)
    var newDiv = $("<div class='col text-center mt-3 gif'>")
    $(copyDiv).clone().appendTo(newDiv)
    $("#favoritesList").append(newDiv)
}

function grabGIF() {
    searchID = $(this).attr("data-name")
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8lVohNW4hK6A4MpwDklFpubAMw0btVzG&limit=10&rating=PG&lang=en&q=" + searchID;
    offset = 0

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifRow").empty()

        for (let i = 0; i < response.data.length; i++) {
            var newDiv = $("<div class='col text-center mt-3 gif'>")
            var newGIF = response.data[i].images.downsized_still.url
            var newImage = $("<img class='gifImage' alt=''>").attr({
                src: newGIF,
                "data-still": newGIF,
                "data-animate": response.data[i].images.downsized.url,
                "data-state": "still",
                "data-position": i,
            })
            var newRating = $("<p class='text-center pt-2'>").text("GIF Rating: " + response.data[i].rating.toUpperCase())
            var favButton = $("<button class='btn btn-primary favorite'>").text("Favorite")

            newDiv.append(newImage)
            newDiv.append(newRating)
            newDiv.append(favButton)
            $("#gifRow").append(newDiv)
        }
        console.log(response.data)
        $("#addMoreRow").show()
        $("#favoritesRow").show()
    })
}

function toggleAnimate() {
    var state = $(this).attr("data-state")
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
} 

$(document).ready(function() {
    $("#addGif").on("click", addButton)
    $("#addMore").on("click", addMore)
    $(document).on("click", ".gifButton", grabGIF)
    $(document).on("click", ".gifImage", toggleAnimate)
    $(document).on("click", ".favorite", addFavorite)
});


// Notes Section
/*

TODO:
    - Mobile responsiveness

BONUSES:
    - Ensure mobile responsiveness
    - Display additional metadata (title, tags, etc.)
    - EXTRA BONUS: Make the favorites persist when page is reloaded
        - localStorage or cookies
    - Integrate the application with additional APIs
*/