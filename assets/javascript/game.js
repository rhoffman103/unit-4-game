
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
    engramArray: [],
    // uncommon: 0,
    // rare: 0,
    // legendary: 0,
    // exotic: 0,
    // silver:0,

    engramValues: [{
        value: 0
    },
    { 
        value: 0
    },
    { 
        value: 0
    },
    {
        value: 0
    },
    {
        value: 0
    }],

    setEngramValues: function () {
        for (var i=0; i < this.engramValues.length; i++) {
            this.engramValues[i].value = Math.ceil(Math.random() * 12);
        }
    },

    setEngramNums: function () {
        for (var i = 0; i < 5; i++) {
            this.engramArray.push(Math.floor(Math.random() * 12 + 1));
        } 
        console.log(this.engramArray);
        // this.uncommon = this.engramArray[0];
        // this.rare = this.engramArray[1];
        // this.legendary = this.engramArray[2];
        // this.exotic = this.engramArray[3];
        // this.silver = this.engramArray[4];
    },
}

var computer = {
    targetNum:   0,

    setTargetNum: function () {
        this.targetNum  = (Math.floor(Math.random() * 120) + 19);
    },
}

// START GAME
computer.setTargetNum();
engram.setEngramNums();
console.log(engram);
console.log(computer.targetNum);

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

    // DISPLAY TARGET VALUE
    $("#target").html(computer.targetNum);

    // TOGGLE RULES LIST
    $("#rules").on("click", function(){
        $("#rule-list").toggle();
    });

    // ADD ENGRAMS TO SCORE
    $(".engram").on("click", function() {
        score += $(this).val();
        console.log("score = " + score);
        $("#score").html(score);
    });

});