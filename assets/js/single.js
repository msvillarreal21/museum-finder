var artworkNameEl = document.querySelector("#artist-name");
// var issueContainerEl = document.querySelector("#issues-container");
// var limitWarningEl = document.querySelector("#limit-warning");

var getArtistWork = function(artistName) {
    //grab repo name from url query string
    var queryString = document.location.search;
    var artistName = queryString.split("=")[1];
    
    if(artistName) {
        //display repo name on the page
        artistName.textContent = artistName;

      
    } else {
        //if no repo was given, redirect to homepage
        document.location.replace("./index.html");
    }
};


var getRepoIssues = function(repo) {
    // format the github api url
    var apiUrl = "https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayIssues(data);
  
          // check if api has paginated issues
          if (response.headers.get("Link")) {
            displayWarning(repo);
          }
        });
      }
      else {
          //if not successful, redirect to homepage
        document.location.replace("./index.html");
      }
    });
  };

// var displayIssues =  function(issues) {

//     if (issues.length === 0) {
//         issueContainerEl.textContent = "This repo has no open issues!";
//         return;
//     }
//     for (var i = 0; i <issues.length; i++) {
//         //create a link element to take users to the issues on github
//         var issueEl = document.createElement("a");
//         issueEl.classList = "list-item flex-row justify-space-between align-center";
//         issueEl.setAttribute("href", issues[i].html_url);
//         issueEl.setAttribute("target", "_blank");

//         //create span to hold issue title
//         var titleEl = document.createElement("span");
//         titleEl.textContent = issues[i].title;

//         //append to container
//         issueEl.appendChild(titleEl);

//         //create a type element
//         var typeEl = document.createElement("span");

//         //check if issue is an actual issue or a pull request
//         if (issues[i].pull_request) {
//             typeEl.textContent = "(Pull request)";   
//         } else {
//             typeEl.textContent = "(Issue)";
//         }
//         //append to container
//         issueEl.appendChild(typeEl);

//         issueContainerEl.appendChild(issueEl);
//     }
    
// };

// var displayWarning = function(repo) {
//     //add text to warining container
//     limitWarningEl.textContent = "To see more than 30 lissues, visit ";

//     var linkEl = document.createElement("a");
//     linkEl.textContent = "See More Issues on GitHub.com";
//     linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
//     linkEl.setAttribute("target", "_blank");

//     //append to warning container
//     limitWarningEl.appendChild(linkEl);
// };

getArtistWork();