// elements
var form = document.getElementById("film-form");
var titleElement = document.querySelector("#title");
var directorElement = document.querySelector("#director");
var urlElement = document.querySelector("#url");
var cardBody = document.querySelectorAll(".card-body")[1];
var clear = document.getElementById("clear-films");

// UI object
var ui = new UI();
// storage object 
var storage = new Storage();
// all events 
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        var films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    var title = titleElement.value;
    var director = directorElement.value;
    var url = urlElement.value;
    
    if(url === "" || director === "" || url === ""){
        // error
        ui.displayMesages("Please Fill All Inputs","danger");

    }
    else{
        // new movie
        var newFilm = new Film(title,director,url);
        
        ui.addFilmToUI(newFilm); // adding movie to ui
        storage.addFilmToStorage(newFilm); // adding movies to storage
        ui.displayMesages("Movie Added","success");
    }
    ui.clearInput(titleElement,urlElement,directorElement);


    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMesages("Deleted","success");
    }
}

function clearAllFilms(){
    if(confirm("Do you want to clear all movies?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}
    