var movingMouse;
var amountOfWords = 0;
var bin = document.getElementById("bin");
var wordCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    //x10 max
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
            localStorage.setItem(obj.className+"posX", obj.style.left);
            localStorage.setItem(obj.className+"posY", obj.style.top);
            if(event.clientX <= 1){
                localStorage.removeItem(obj.className);
                localStorage.removeItem(obj.className+"posX");
                localStorage.removeItem(obj.className+"posY");
                localStorage.removeItem(obj.className+"text");
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

var input1 = document.getElementById("inputField");

function clickCheck(){
    if(input1.value != ""){
        CreateWord(0, 0, "", false, 66);
        input1.value = "";
    }
    let clickEvent = new Event('click');
    document.getElementById('inputField').dispatchEvent(clickEvent)
}

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

//-1 up
// 1 down


//data base


function CreateWord(posX, posY, text, load, num21){
    if(load == false){
        var canMake = false;
        var num = null;
        for(var i=0;i<wordCount.length;i++){
           if(wordCount[i] == 0){
              localStorage.setItem(i, 1);
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
            obj.innerHTML = input1.value;
            document.body.append(obj);
            obj.style.left = window.innerWidth/2-obj.offsetWidth/2+"px";
            obj.style.top = window.innerHeight/2-obj.offsetHeight/2+"px";
            localStorage.setItem(num+"text", obj.innerHTML);
            localStorage.setItem(num+"posX", obj.style.left);
            localStorage.setItem(num+"posY", obj.style.top);
            amountOfWords++;
        }
    }
    else{
        var obj = document.createElement("div");
        obj.setAttribute("id", "task");
        obj.setAttribute("draggable", "false");
        obj.setAttribute("onmouseover", "detect(this)");
        obj.setAttribute("class", num21);
        obj.innerHTML = localStorage.getItem(num21+"text");
        document.body.append(obj);
        obj.style.left = localStorage.getItem(num21+"posX");
        obj.style.top = localStorage.getItem(num21+"posY");
        amountOfWords++;
    }
}


function Load(){
    for(var i = 0; i < wordCount.length; i++){
        if(localStorage.getItem(i) != null){
            wordCount[i] = localStorage.getItem(i);
            CreateWord(localStorage.getItem(i+"posX"), localStorage.getItem(i+"posY"), localStorage.getItem(i+"text"), true, i);
        }
    }
}



Load();


var wordDisplay = document.getElementById("wordDisplay")
wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 - 30)+ "px";
window.addEventListener('resize', function(event) {
    wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
    wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 )+ "px";
}, true);


var lastNum = null;
function generateRandomWord(){
    if(amountOfWords > 1){
        var state2 = true;
        while(state2 == true){
            var t = randomIntFromInterval(0, wordCount.length);
            if(localStorage.getItem(t) == 1 && (t!=lastNum)){
                wordDisplay.innerHTML = localStorage.getItem(t+"text");
                wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
                wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
                lastNum = t;
                state2 = false;
            }
        }
    }else{
        for(var i = 0; i<wordCount.length;i++){
            if(wordCount[i] == 1){
                wordDisplay.innerHTML = localStorage.getItem(i+"text");
                wordDisplay.style.left = (window.innerWidth/2 - wordDisplay.offsetWidth/2 )+ "px";
                wordDisplay.style.top = (window.innerHeight/2 - wordDisplay.offsetHeight/2 -30)+ "px";
            }
        }
    }
    
}



//=============================================================== Random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//==============================================================



addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        clickCheck();
    }
});