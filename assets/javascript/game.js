
var modalwin = document.getElementById('win-modal');
var modalloss = document.getElementById('lose-modal');
var span  = document.getElementsByClassName("close")[0];
var winbtn = document.getElementById("win-btn");
var lossbtn = document.getElementById("loss-btn");

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
        }
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
        updateDOM();
        console.log(engram);
    },
    checkGameOver: function () {
        if (player.score === this.targetNum) {
            player.wins++;
            modalwin.style.display = "block";
            this.resetGame();
        } 
        else if (player.score > this.targetNum) {
            player.losses++;
            modalloss.style.display = "block";
            this.resetGame();
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if ((event.target == modalwin) || (event.target == modalloss)) {
        modalwin.style.display = "none";
        modalloss.style.display = "none";
    }
}

const updateDOM = function() {
    document.getElementById("score").innerHTML = player.score;
    document.getElementById("wins").innerHTML = player.wins;
    document.getElementById("losses").innerHTML = player.losses;
    document.getElementById("target").innerHTML = computer.targetNum;
}

computer.resetGame();

$(document).ready(function(){
    
    // const updateDOMjquery = function() {
    //     $("#score").html(player.score);
    //     $("#wins").html(player.wins);
    //     $("#losses").html(player.losses);
    //     $("#target").html(computer.targetNum);
    // }

    // ADD IMAGE-BUTTONS TO DIV
    for (var i=0; i < engram.engramValues.length; i++) {
        $('.engram').append($('<img>',{value: engram.engramValues[i].value, class: "engram-btn", src: engram.engramValues[i].image}));
    }

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
        $("#win-modal").show();
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