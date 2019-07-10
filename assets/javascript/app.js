var topics = ["Goku", "Gohan", "Vegeta", "Trunks", "Krillin", "Frieza", "Kid Buu", "Shenron"]

var searchID
var queryURL

$("#buttonsRow").empty();

// Add existing topics as buttons
for (var i = 0; i < topics.length; i++) {

    var newButton = $("<button>");
    newButton.addClass("gifButton btn btn-secondary m-1");
    newButton.attr("data-name", topics[i]);
    newButton.text(topics[i]);

    $("#buttonsRow").append(newButton);
}

function addButton(event) {
    event.preventDefault()

    searchID = ($("#gifInput").val()).charAt(0).toUpperCase() + ($("#gifInput").val()).slice(1)

    var newButton = $("<button>")
    newButton.addClass("gifButton btn btn-secondary m-1")
    newButton.attr("data-name", searchID)
    newButton.text(searchID)

    $("#buttonsRow").append(newButton)
}

function grabGIF() {
    searchID = $(this).attr("data-name")
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8lVohNW4hK6A4MpwDklFpubAMw0btVzG&limit=6&rating=PG&lang=en&q=" + searchID;

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
    var stillSourceArray = ["giphy-downsized_s", "giphy_s"]
    var stillCheck = false
    var stillSource = ''
    var sourceReplace = ''

    for (let i = 0; i < stillSourceArray.length; i++) {
        if (!stillCheck) {
            stillCheck = imgSource.includes(stillSourceArray[i])
            if (stillCheck) {
                stillSource = stillSourceArray[i]
            }
        }
    }
    
    console.log(imgSource)
    console.log(stillSource)
    console.log(stillCheck)

    if (stillCheck) {
        sourceReplace = imgSource.replace(stillSource, "giphy-downsized")
        $(this).attr("src", sourceReplace)
        stillCheck = false
    } else {
        sourceReplace = imgSource.replace("giphy-downsized", "giphy-downsized_s")
        $(this).attr("src", sourceReplace)
        stillCheck = true
    }
} 

$(document).ready(function() {
    $("#addGif").on("click", addButton)
    $(document).on("click", ".gifButton", grabGIF)
    $(document).on("click", ".gifImage", toggleAnimate)
});


// Notes Section
/*

toggleAnimate source replace fix:
- store both still and active sources in two arrays, replace from array
- 


TODO:
    - Format HTML like example image
    - Add a case handler for user input
    - Fix toggleAnimate bug
        - Works only after clicking twice the first time

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