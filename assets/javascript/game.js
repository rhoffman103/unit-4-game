
var modal = document.getElementById('modal');
var modalActive = false;

// Player Object
var player = {
    score:  1,
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
        } console.log(this.engramValues);
    },
}

var computer = {
    targetNum:   0,

    setTargetNum: function () {
        this.targetNum  = (Math.floor(Math.random() * 120) + 19);
    },
    resetGame: function () {
        player.score = 0;
        this.setTargetNum();
        engram.setEngramValues();
        $resetEngramValues();
        $updateDOM();
    },
    checkGameOver: function () {
        if (player.score === this.targetNum) {
            player.wins++;
            $openModal("Well done guardian!!!");
            this.resetGame();
        } 
        else if (player.score > this.targetNum) {
            player.losses++;
            $openModal("Your light fades away...");
            this.resetGame();
        }
    }
}

// Click anywhere outside the modal to close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// ADD IMAGE-BUTTONS TO DIV
const $asignEngrams = function() {
    for (var i=0; i < engram.engramValues.length; i++) {
        $('.engram').append($('<img>',{value: engram.engramValues[i].value, class: "engram-btn", id: ("engram-" + (i + 1)), src: engram.engramValues[i].image}));
    }
};

// RESET ENGRAM VALUES
const $resetEngramValues = function() {
    for (var i=0; i < engram.engramValues.length; i++) {
        $("#engram-" + (i + 1)).attr({value: engram.engramValues[i].value});
    }
    console.log("reset");
    console.log(engram.engramValues);
};

// INSERT GAME DIVS
const $insertGameInfo = function(heading, numberID) {
    $("#game-info").html(heading);
    $(".tracker").append($("<span>",{id: numberID}));
    $("#game-row").append("#game-div");
}

// INSERT MESSAGE FOR MODAL
const $openModal = function(message) {
    $("#modal-message").html(message);
    $(".modal").show();
}

const $updateDOM = function() {
    $("#score").html(player.score);
    $("#wins").html(player.wins);
    $("#losses").html(player.losses);
    $("#target").html(computer.targetNum);
}

// $insertGameInfo("Target", "target");
// $insertGameInfo("Score", "score");
computer.resetGame();
$asignEngrams();

$(document).ready(function(){

    // TOGGLE RULES LIST
    $("#rules").on("click", function(){
        $("#rule-list").toggle();
    });

    // ADD ENGRAMS TO SCORE
    $(".engram-btn").on("click", function() {
        player.score += parseInt($(this).attr("value"));
        $("#score").html(player.score);
        computer.checkGameOver();
    });

    // OPEN MODAL
    $("#win-btn").on("click", function() {
        $openModal("nonsense poopy pants!");
        modalActive = true;
    })

    // Close modal
    $(".close").on("click", function() {
        $(".modal").hide();
        modalActive = false;
    });

    // **FIXME**

    // $(".container").on("click", function() {
    //     if (modalAvtive) {
    //         $(".modal").hide();
    //         modalActive = flase;
    //     }
    // });

});