var topics = ["Goku", "Gohan", "Vegeta", "Trunks", "Krillin", "Frieza", "Kid Buu", "Shenron"]

$("#buttonsRow").empty();

// Add existing topics as buttons
for (var i = 0; i < topics.length; i++) {

    var newButton = $("<button>");
    newButton.addClass("gifButton btn btn-secondary m-1");
    newButton.attr("data-name", topics[i]);
    newButton.text(topics[i]);

    $("#buttonsRow").append(newButton);
}

var searchID
var queryURL

function addButton(event) {
    event.preventDefault()

    searchID = ($("#gifInput").val()).charAt(0).toUpperCase() + ($("#gifInput").val()).slice(1)
    var replaceID = searchID
    for (let i = 0; i < searchID.length; i++) {
        if (searchID.charAt(i) === ' ') {
            console.log("Space at index: " + i)
            var replaceIndex = i+1
            var replaceLetter = searchID.charAt(replaceIndex).toUpperCase()
            console.log(replaceLetter, replaceIndex)
        }        
        replaceID = searchID.replace(searchID[replaceIndex], replaceLetter)
    }

    var newButton = $("<button>")
    newButton.addClass("gifButton btn btn-secondary m-1")
    newButton.attr("data-name", replaceID)
    newButton.text(replaceID)
    $("#buttonsRow").append(newButton)
}

function grabGIF() {
    searchID = $(this).attr("data-name")
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8lVohNW4hK6A4MpwDklFpubAMw0btVzG&limit=10&rating=PG&lang=en&q=" + searchID;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifRow").empty()

        for (let i = 0; i < response.data.length; i++) {
            var newDiv = $("<div class='col-lg-4 text-center mt-3 gif'>")
            var newGIF = response.data[i].images.downsized_still.url
            var newImage = $("<img class='gifImage' alt=''>").attr("src", newGIF)
            var newRating = $("<p class='text-center pt-2'>").text("GIF Rating: " + response.data[i].rating.toUpperCase())

            newDiv.append(newImage)
            newDiv.append(newRating)
            $("#gifRow").append(newDiv)
        }
        console.log(response.data)
    })
}

function toggleAnimate() {
    var imgSource = $(this).attr("src")
    var sourceReplace = ''
    
    // Returns true if the image is still
    var stillImage = imgSource.includes("_s.gif?")

    // If the image is still, make it animated
    // If not, make it still
    if (stillImage) {
        sourceReplace = imgSource.replace("_s.gif?", ".gif?")
        $(this).attr("src", sourceReplace)
    } else {
        sourceReplace = imgSource.replace(".gif?", "_s.gif?")
        $(this).attr("src", sourceReplace)
    }
} 

$(document).ready(function() {
    $("#addGif").on("click", addButton)
    $(document).on("click", ".gifButton", grabGIF)
    $(document).on("click", ".gifImage", toggleAnimate)
});


// Notes Section
/*

- Replace toggleAnimate function with "pausing-gifs.html" example

TODO:
    - Format HTML like example image
    - Mobile responsiveness
    - Add a case handler for user input

BONUSES:
    - Ensure mobile responsiveness
    - Allow users to add 10 more GIFs to the page
        ** DONT REPLACE **
    - Display additional metadata (title, tags, etc.)
    - Allow users to add to a "Favorites" list
        - Should persist when the user selects or adds a new topic
        - EXTRA BONUS: Make the section persist when page is reloaded
            - localStorage or cookies
    - Integrate the application with additional APIs


*/