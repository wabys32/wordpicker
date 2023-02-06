var nameInput = document.getElementById("addDatabaseField");
var cards = document.getElementById("cards");

var space = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function loadDataBases(){
    for(var i = 0; i<space.length; i++){
        if(localStorage.getItem(i+"db") != null){
            space[i] = 1;
            var db = document.createElement("div");
            db.setAttribute("class", localStorage.getItem(i+"db"));
            db.setAttribute("id", "databaseBlock");
            db.innerHTML = '<p id="databaseTitle">'+localStorage.getItem(i+"db")+'</p><div id="buttons"><button id="deleteDbButton" onclick="deleteDatabase(`'+localStorage.getItem(i+"db")+'`)">Delete</button><button id="loadDbButton" onclick="enterDatabase(`'+localStorage.getItem(i+"db")+'`)">Enter</button></div>';
            cards.append(db);
        }
    }    
}
loadDataBases();


function createNewDatabase() {
    var canCreate = true;
    for(var i = 0; i<space.length; i++){
        if(nameInput.value == localStorage.getItem(i+"db")){
            canCreate = false;
        }
    }
    for(var i = 0; i<space.length; i++){
        if(space[i] == 0 && canCreate == true){
            var db = document.createElement("div");
            db.setAttribute("class", nameInput.value);
            db.setAttribute("id", "databaseBlock");
            db.innerHTML = '<p id="databaseTitle">'+nameInput.value+'</p><div id="buttons"><button id="deleteDbButton" onclick="deleteDatabase(`'+nameInput.value+'`)">Delete</button><button id="loadDbButton" onclick="enterDatabase(`'+nameInput.value+'`)">Enter</button></div>';
            cards.append(db);
            localStorage.setItem(i+"db", nameInput.value);
            space[i] = 1;
            break;
        }
    }
}

function enterDatabase(name){
    localStorage.setItem("db_key", name);
    window.location.href = "index.html";
}

function clearData(){
    localStorage.clear();
    location.reload();
}

function deleteDatabase(cl){
    var block = [];
    block = document.getElementsByClassName(cl);
    localStorage.removeItem(cl+"db"+"text");
    block[0].remove();
    for(var i = 0; i < space.length; i++){
        if(localStorage.getItem(i+"db") == cl){
            space[i] = 0;
            //data, that we need to remove in index.js file:
            for(var j = 0; j<40; j++){
                localStorage.removeItem(cl+"posX");
                localStorage.removeItem(cl+"posY");
                localStorage.removeItem(cl+"text");
                localStorage.removeItem(cl+"title");
                localStorage.removeItem(cl+j);
            }
            localStorage.removeItem(i+"db");
            break;
        }
    }
}



var state = false;
var button1 = document.getElementById("add");
function floatField(){
	state = !state;
	if(state == true){
		button1.innerHTML = "-";
		nameInput.className = 'floatUp';
	}else{
		button1.innerHTML = "+";
		nameInput.className = 'floatDown';
	}
}



function clickCheck(){
	if(nameInput.value != "" && nameInput.value.length <= 18){
		createNewDatabase();
        nameInput.value = "";
        //====================== click on input field again
        let clickEvent = new Event('click');
        nameInput.dispatchEvent(clickEvent)
	}
}

addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        clickCheck();
    }
});