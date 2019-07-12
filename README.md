# GifTastic

Caleb Myers

### Overview

This application connects to the GIPHY API to retrieve GIFs based on requested topics.

The page loads with a preset section of labelled buttons. Each of these buttons will send a request to GIPHY asking for 10 GIFs related to the word or phrase on the button.

An input field is available on the right side of the page, where the user can enter a topic they would like to add a button for. When the "Add" button is clicked, a new button will appear after the preset button labelled with the value of the input. This new button will function the same as the preset ones, sending a request to GIPHY asking for 10 GIFs related to the word or phrase added by the user.

Once any of the labelled buttons on top are pressed, the main body of the page will fill with static GIFs related to the search request. The images are displayed with the image's rating, and a "Favorite" button.

The GIFs themselves will toggle between static and animated images when clicked.
    - i.e. The image will become animated if clicked when static, and will become static if clicked when animated

After GIFs have been loaded, new content appears on the right side of the page under the "Add" area: a new button, labelled "More GIFs!", and a new section labelled "Favorites: ".

The "More GIFs!" button will add 10 more static GIFs to the page, related to the currently active topic. Existing GIFs will remain and the new ones will be append to the main body. These new GIFs have the same functionality as the rest.

If the user clicks the "Favorite" button located under every GIF, the corrosponding GIF and its rating will be added to the "Favorites: " section. GIFs in the "Favorites: " section will remain even if a new topic is requested, and have the same functionality as the originals.