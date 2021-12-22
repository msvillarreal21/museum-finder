var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");
var userFromEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");



var buttonClickHandler = function(event) {
   var language = event.target.getAttribute("data-language");
   if (language) {
       getFeaturedRepos(language);
       //clear old content
       repoContainerEl.textContent = "";
   }
};

var getUserRepos = function(users) {
    // format the github api url
    var apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, users);
        });
    } else {
        alert("Error: Artist Not Found");
    }
    })
    .catch(function(error) {
        //notice this `.catch()` getting chained onto the end of `.then()`method
        alert("Unable to connect to MetMuseum.org");
    });

    console.log("outside");
    var response = fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1");
    console.log(response);
};


var getFeaturedRepos = function(language) {
    var apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
            });
        }else {
            alert ("Error: Artist not found");
        }
    })
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a artist name"); 
    }
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No artist found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    //clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

//loop over repos
for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    //append to container 
    repoEl.appendChild(statusEl);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);

}
};
//add event listeners to form and button container 
userFromEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);