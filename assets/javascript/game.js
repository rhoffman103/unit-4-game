$(document).ready(function(){
    var modal = document.getElementById('modal');

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

        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        shuffle: function(arr) {
        
            let mutatedArray = arr.map(element => element);
            let arrayLength = mutatedArray.length;
            let temporaryValue, randomIndex;

            arr.forEach((elem, index) => {
                let maxIndex = (arrayLength - 1) - index;
                randomIndex = Math.floor(Math.random() * maxIndex);

                temporaryValue = mutatedArray[maxIndex];
                mutatedArray[maxIndex] = mutatedArray[randomIndex];
                mutatedArray[randomIndex] = temporaryValue;
            })
        
            return mutatedArray;
        },

        setEngramValues: function () {
            let mutatedNumbers = this.shuffle(this.numbers);

            this.engramValues.forEach(function(eng, i) {
                eng.value = mutatedNumbers.shift();
            });
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
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // };

    // ADD IMAGE-BUTTONS TO DIV
    const $asignEngrams = function() {
        const animateIt = {
            animation: ['bounceInRight', 'bounceInUp', 'bounceIn', 'bounceInDown', 'bounceInLeft'],
            delay: ['delay-0', 'delay-400', 'delay-800', 'delay-600', 'delay-200']
        }

        engram.engramValues.forEach(function(eng, i) {
            $('.engram').append($('<img>',{value: eng.value, class: `animated ${animateIt.animation[i]} ${animateIt.delay[i]} engram-btn engram-${i}`, id: ("engram-" + (i + 1)), src: eng.image}));
        })

        setTimeout(function() {
            engram.engramValues.forEach(function(eng, i) {
                $(`.engram-${i}`).removeClass(`animated ${animateIt.animation[i]} ${animateIt.delay[i]}`)
            });
        }, 1800)
    };

    // RESET ENGRAM VALUES
    const $resetEngramValues = function() {
        for (var i=0; i < engram.engramValues.length; i++) {
            $("#engram-" + (i + 1)).attr({value: engram.engramValues[i].value});
        }
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

    const $openRulesAfterAnimations = function() {
        setTimeout(function() {
            $("#rule-list").toggle("medium");
        }, 1200);
    };

    // $insertGameInfo("Target", "target");
    // $insertGameInfo("Score", "score");
    computer.resetGame();
    $asignEngrams();
    $openRulesAfterAnimations();

    // TOGGLE RULES LIST
    $("#rules").on("click", function(){
        $("#rule-list").toggle("medium");
    });

    // ADD ENGRAMS TO SCORE
    $(".engram-btn").on("click", function() {
        player.score += parseInt($(this).attr("value")) || 0;
        $("#score").html(player.score);
        computer.checkGameOver();
    });

    // OPEN MODAL (test modal)
    $("#win-btn").on("click", function() {
        $openModal("nonsense poopy pants!");
    })

    // Close modal with x. (no longer need with new close event)
    // $(".close").on("click", function() {
    //     $(".modal").hide();
    // });

    // Click only outside modal message box to close
    $(".modal").on("click", function(event) {
        var target = $(event.target);
        
        if ((!target.is("div.modal-header"))
            && (!target.is("div.modal-body"))
            && (!target.is("h2#modal-message"))) {    
                $(".modal").hide();
                modalActive = false;
        }
    });

});