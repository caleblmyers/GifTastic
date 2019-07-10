var topics = ["Goku", "Gohan", "Vegeta", "Trunks", "Krillin", "Frieza", "Kid Buu", "Shenron"]
var searchID
var queryURL

$("#buttonsRow").empty();

for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("gifButton btn btn-secondary m-1");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);

    $("#buttonsRow").append(a);
}

$(document).ready(function() {
    $("#addGif").on("click", function(event) {
        event.preventDefault()

        searchID = $("#gifInput").val()

        searchID = searchID.charAt(0).toUpperCase() + searchID.slice(1)

        var a = $("<button>")
        a.addClass("gifButton btn btn-secondary m-1")
        a.attr("data-name", searchID)
        a.text(searchID)
    
        $("#buttonsRow").append(a)
    })

    $(document).on("click", ".gifButton", function() {
        searchID = $(this).attr("data-name")
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8lVohNW4hK6A4MpwDklFpubAMw0btVzG&limit=10&rating=PG&lang=en&q=" + searchID;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#gifRow").empty()

            for (let i = 0; i < response.data.length; i++) {
                $("#gifRow").append(
                    "<img src='" + response.data[i].images.downsized.url+ "alt=''>"
                )
            }
        })
    })
});


// Notes Section
/*

TODO:
    - Create array of "topics"
    - Create row of "topic" buttons
    - Have "topic" buttons send requests to GIPHY based on the topic
    - Fill "gif-area" with still GIFs based on the topic
    - When the GIFs are called, any GIFs already on the page are removed
    - User input adds a new button with whatever they entered
    - This new button will function the same, grabbibg GIFs on the topic


*/