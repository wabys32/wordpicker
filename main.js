var inputField = document.getElementById("inputField")
var titleField = document.getElementById("titleField")

var db_key = localStorage.getItem("db_key");
document.title = db_ley;

var movingMouse;
var amountOfWords = 0;
var bin = document.getElementById("bin");
var wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    //x40 word slots
function detect(object){
    var obj = object;

    obj.onmousedown = function(e) { // track click

    // prepare to move
    // place in the same place, but in absolute coordinates
    obj.style.position = 'absolute';
    obj.style.fontSize = 2.2+"vmin";
    moveAt(e);
    // move it to body so that the ball is definitely not inside position:relative
    document.body.appendChild(obj);

    obj.style.zIndex = 1000; // show the ball over other elements

    // move obj under the cursor coordinates and shift half width/height to center
    function moveAt(e) {
        obj.style.left = e.pageX - obj.offsetWidth / 2 + 'px';
        obj.style.top = e.pageY - obj.offsetHeight / 2 + 'px';
    }

    // move over the screen
    document.onmousemove = function(e) {
        moveAt(e);
        if(event.clientX <= 1){
            bin.style.opacity = "0.5";
        }else{
            bin.style.opacity = "0";
        }

        if(event.clientX < 0){
            obj.style.left = 0-obj.offsetWidth/2+"px";
        }
        if(event.clientX > window.innerWidth){
            obj.style.left = window.innerWidth-obj.offsetWidth/2+"px";
        }
        if(event.clientY < 0){
            obj.style.top = 0-obj.offsetHeight/2+"px";
        }
        if(event.clientY > window.innerHeight){
            obj.style.top = window.innerHeight-obj.offsetHeight/2+"px";
        }
    }

    // end of drag
    obj.onmouseup = function() {
            var rect = obj.getBoundingClientRect();
            obj.style.fontSize = "2vmin";
            obj.style.left = event.clientX-obj.offsetWidth/2+"px";
            obj.style.top = event.clientY-obj.offsetHeight/2+"px";
            obj.style.zIndex = 0;
            localStorage.setItem(db_key+obj.className+"posX", obj.style.left);
            localStorage.setItem(db_key+obj.className+"posY", obj.style.top);
            if(event.clientX <= 1){
                localStorage.removeItem(db_key+obj.className);
                localStorage.removeItem(db_key+obj.className+"posX");
                localStorage.removeItem(db_key+obj.className+"posY");
                localStorage.removeItem(db_key+obj.className+"text");
                localStorage.removeItem(db_key+obj.className+"title");
                amountOfWords--;
                wordCount[obj.className] = 0;
                obj.remove();

            }
            bin.style.opacity = "0";
            
            document.onmousemove = null;
            obj.onmouseup = null;
        }
    }
}
//===================================================================================================


function clickCheck(){
    if(inputField.value != "" && titleField.value != ""){
        CreateWord(0, 0, "", false, 66, "");
        inputField.value = "";
        titleField.value = "";
    }
    let clickEvent = new Event('click');
    document.getElementById('inputField').dispatchEvent(clickEvent)
}


function CreateWord(posX, posY, text, load, num21, title){
    if(load == false){
        var canMake = false;
        var num = null;
        for(var i=0;i<wordCount.length;i++){
           if(wordCount[i] == 0){
              localStorage.setItem(db_key+i, 1);
              wordCount[i] = 1;
              canMake = true;
              num = i;
                 break;
             }
        }
        if(canMake == true){
            var obj = document.createElement("div");
            obj.setAttribute("id", "task");
            obj.setAttribute("draggable", "false");
            obj.setAttribute("onmouseover", "detect(this)");
            obj.setAttribute("class", num);
            obj.innerHTML = inputField.value;
            document.body.append(obj);
            obj.style.left = window.innerWidth/2-obj.offsetWidth/2+"px";
            obj.style.top = window.innerHeight/2-obj.offsetHeight/2+"px";
            localStorage.setItem(db_key+num+"text", obj.innerHTML);
            localStorage.setItem(db_key+num+"posX", obj.style.left);
            localStorage.setItem(db_key+num+"posY", obj.style.top);
            localStorage.setItem(db_key+num+"title", titleField.value);
            
            obj.setAttribute("title", titleField.value);
            amountOfWords++;
        }
    }
    else{
        var obj = document.createElement("div");
        obj.setAttribute("id", "task");
        obj.setAttribute("draggable", "false");
        obj.setAttribute("onmouseover", "detect(this)");
        obj.setAttribute("class", num21);
        obj.setAttribute("title", localStorage.getItem(db_key+num21+"title"));
        obj.innerHTML = localStorage.getItem(db_key+num21+"text");
        document.body.append(obj);
        obj.style.left = localStorage.getItem(db_key+num21+"posX");
        obj.style.top = localStorage.getItem(db_key+num21+"posY");
        amountOfWords++;
    }
}


function Load(){
    for(var i = 0; i < wordCount.length; i++){
        if(localStorage.getItem(db_key+i) != null){
            wordCount[i] = localStorage.getItem(db_key+i);
            CreateWord(localStorage.getItem(db_key+i+"posX"), localStorage.getItem(db_key+i+"posY"), localStorage.getItem(db_key+i+"text"), true, i, localStorage.getItem(db_key+i+"title"));
        }
    }
}



Load();


addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        clickCheck();
    }
});


var wordDisplay = document.getElementById("wordDisplay")
var generateButton = document.getElementById("randomWordButton")
var titleDisplay = document.getElementById("titleDisplay")
var showAnswerButton = document.getElementById("showAnswerButton")
inputField.style.left = (window.innerWidth/2 - inputField.offsetWidth-20)+"px";
titleField.style.left = (window.innerWidth/2 +20)+"px";
generateButton.style.left = (window.innerWidth/2 - generateButton.offsetWidth -4)+ "px";
showAnswerButton.style.left = (window.innerWidth/2 + 4)+ "px";
wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
titleDisplay.style.left = (window.innerWidth/2 - titleDisplay.offsetWidth/2 )+ "px";
titleDisplay.style.top = (window.innerHeight/2 - titleDisplay.offsetHeight/2)+ "px";  
window.addEventListener('resize', function(event) {
    wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
    wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
    titleDisplay.style.left = (window.innerWidth/2 - titleDisplay.offsetWidth/2 )+ "px";
    titleDisplay.style.top = (window.innerHeight/2 - titleDisplay.offsetHeight/2)+ "px";  
    generateButton.style.left = (window.innerWidth/2 - generateButton.offsetWidth -4)+ "px";
    showAnswerButton.style.left = (window.innerWidth/2 + 4)+ "px";
    inputField.style.left = (window.innerWidth/2 - inputField.offsetWidth-20)+"px";
    titleField.style.left = (window.innerWidth/2 +20)+"px";
}, true);


var lastNum = null;
function generateRandomWord(){
    if(amountOfWords > 1){
        var state2 = true;
        while(state2 == true){
            var t = randomIntFromInterval(0, wordCount.length);
            if(localStorage.getItem(db_key+t) == 1 && (t!=lastNum)){
                wordDisplay.innerHTML = localStorage.getItem(db_key+t+"text");
                titleDisplay.innerHTML = localStorage.getItem(db_key+t+"title");
                wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
                wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
                titleDisplay.style.left = (window.innerWidth/2 - titleDisplay.offsetWidth/2 )+ "px";
                titleDisplay.style.top = (window.innerHeight/2 - titleDisplay.offsetHeight/2)+ "px";   
                lastNum = t;
                state2 = false;
            }
        }
    }else{
        for(var i = 0; i<wordCount.length;i++){
            if(wordCount[i] == 1){
                wordDisplay.innerHTML = localStorage.getItem(db_key+i+"text");
                titleDisplay.innerHTML = localStorage.getItem(db_key+i+"title");
                wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
                wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
                titleDisplay.style.left = (window.innerWidth/2 - titleDisplay.offsetWidth/2 )+ "px";
                titleDisplay.style.top = (window.innerHeight/2 - titleDisplay.offsetHeight/2)+ "px";   
            }
        }
    }
     titleDisplay.style.opacity = "0";
}

//=============================================================== Random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//==============================================================

var back = document.getElementById("back");
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    if(delta == -1){
        back.style.opacity = "1";
        back.style.pointerEvents = "auto";
    }else{
        back.style.opacity = "0";
        back.style.pointerEvents = "none";
    }
});


function showAnswer() {
    titleDisplay.style.opacity = "1";
}

function goBackToDB(){
    window.location.href = "index.html";
}
