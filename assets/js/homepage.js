var artContainerEl = document.querySelector("#art-container");
var artSearchTerm = document.querySelector("#art-search-term");
var languageButtonsEl = document.querySelector("#option-buttons");
var userFromEl = document.querySelector("#artist");
var nameInputEl = document.querySelector("#artistname");



var buttonClickHandler = function(event) {
   var language = event.target.getAttribute("data-language");
   if (language) {
       getArtistWork(language);
       //clear old content
       artContainerEl.textContent = "";
   }
};

var getArtistWork = function(artwork) {
    // format the  api url
    var apiUrl = "https://api.artic.edu/api/v1/artworks/search?q=artist&query[term][is_public_domain]=true";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayArtWork(data, artwork);
        });
    } else {
        alert("Error: Artist Not Found");
    }
    })
    .catch(function(error) {
        //notice this `.catch()` getting chained onto the end of `.then()`method
        alert("Unable to connect to MetMuseum.org");
    });

    // console.log("outside");
    var response = fetch("https://api.artic.edu/api/v1/artworks/search?q=artist&query[term][is_public_domain]=true");
    console.log(response);
};


var getWorksOfArt = function(language) {
    var apiUrl = "https://api.artic.edu/api/v1/artworks/search?q=artist&query[term][is_public_domain]=true";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayArtWork(data.items, language);
            });
        }else {
            alert ("Error: Artist not found");
        }
    })
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var artistname = nameInputEl.value.trim();

    if(artistname) {
        displayArtWork(artistname);
        nameInputEl.value = "";
    } else {
        alert("Please enter a artist name"); 
    }
    console.log(event);
};

var displayArtWork = function(art, searchTerm) {
    //check if api returned any art work
    if (art.length === 0) {
        artContainerEl.textContent = "No artist found.";
        return false;
   } else {
      
    //  console.log(art);
    //  console.log(searchTerm);
    // //clear old content
    artContainerEl.textContent = "";
    artSearchTerm.textContent = searchTerm;
   }

//loop over 
for (var i = 0; i < art.length; i++) {
    // format artistname
    var artistName = artist[i] + "/" ;

    //create a container for each 
    var artEl = document.createElement("div");
    artEl.classList = "list-item flex-row justify-space-between align-center";
    artEl.setAttribute("href", "https://api.artic.edu/api/v1/artworks/search?q=artist&query[term][is_public_domain]=true");

    //create a span element to hold art
    var titleEl = document.createElement("span");
    titleEl.textContent = artistName;

    //append to container
    artEl.appendChild(titleEl);

        //append container to the dom
        artContainerEl.appendChild(artEl);
 }
 };

//add event listeners to form and button container 
userFromEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);