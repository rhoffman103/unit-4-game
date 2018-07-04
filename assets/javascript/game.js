
var modal = document.getElementById('win-modal');
var btn   = document.getElementById("prog_btn");
var span  = document.getElementsByClassName("close")[0];

// Player Object
var player = {
    score:  0,
    wins:   0,
    losses: 0
}

//Engram Object
var engram = {
    engramValues: [{
        image: "./assets/images/rare-engram.png",
        value: 0,
    },{
        image: "./assets/images/legendary-engram.png",
        value: 0,
    },{
        image: "./assets/images/prototype-engram.png",
        value: 0,
    },{
        image: "./assets/images/exotic-engram.png",
        value: 0,
    },{
        image: "./assets/images/uncommon-engram.png",
        value: 0,
    }],

    setEngramValues: function () {
        for (var i=0; i < this.engramValues.length; i++) {
            this.engramValues[i].value = Math.ceil(Math.random() * 12);
        }
    },
}

var computer = {
    targetNum:   0,

    setTargetNum: function () {
        this.targetNum  = (Math.floor(Math.random() * 120) + 19);
    },
}

// START GAME
// computer.setTargetNum();
engram.setEngramValues();
console.log(engram);

// MODAL
// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function(){

    // ADD IMAGE-BUTTONS TO DIV
    for (var i=0; i < engram.engramValues.length; i++) {
        $('.engram').append($('<img>',{value: engram.engramValues[i].value , src: engram.engramValues[i].image}))
    }
    
    // DISPLAY TARGET VALUE
    $("#target").html(computer.targetNum);

    // TOGGLE RULES LIST
    $("#rules").on("click", function(){
        $("#rule-list").toggle();
    });

    // ADD ENGRAMS TO SCORE
    $("img").on("click", function() {
        player.score += parseInt($(this).attr("value"));
        $("#score").html(player.score);
    });

});