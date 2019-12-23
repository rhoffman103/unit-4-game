"use strict";
var engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];
;
var Engrams = /** @class */ (function () {
    function Engrams() {
        this.engrams = [];
        this.randomizeEngramValues(engramImages, 12);
        this.renderEngrams();
    }
    ;
    Engrams.prototype.randomizeEngramValues = function (imgs, maxValue) {
        var i = 1;
        var remainingNums = [];
        while (i <= maxValue) {
            remainingNums.push(i);
            i++;
        }
        ;
        this.engrams = imgs.map(function (img) {
            var randNum = Math.floor(Math.random() * remainingNums.length);
            var newValue = remainingNums.splice(randNum, 1)[0];
            return { imageName: img, value: newValue };
        });
    };
    ;
    Engrams.prototype.renderEngrams = function () {
        var engramsDiv = document.getElementById('engrams');
        var engramsFragment = document.createDocumentFragment();
        this.engrams.forEach(function (engram) {
            var img = document.createElement('img');
            img.setAttribute('class', 'clickable-engram engram-btn');
            img.setAttribute('src', "./assets/images/" + engram.imageName);
            img.setAttribute('alt', 'engram');
            img.setAttribute('value', engram.value.toString());
            img.addEventListener('click', function (event) {
                scoreboard.scoreClickHandler(event.currentTarget);
            });
            engramsFragment.appendChild(img);
        });
        engramsDiv.innerHTML = '';
        engramsDiv.appendChild(engramsFragment);
    };
    ;
    return Engrams;
}());
;
var Scoreboard = /** @class */ (function () {
    function Scoreboard() {
        this.score = 0;
        this.wins = 0;
        this.losses = 0;
        this.target = 0;
        this.target = this.getRandomTarget();
        this.updateDomScoreboard();
    }
    ;
    Scoreboard.prototype.readyNewGame = function () {
        this.target = this.getRandomTarget();
        this.score = 0;
        this.updateDomScoreboard();
    };
    ;
    Scoreboard.prototype.scoreClickHandler = function (engramElement) {
        var engramValue = engramElement.getAttribute('value') || 0;
        this.score += +engramValue;
        if (this.score === this.target) {
            this.wins += 1;
            this.readyNewGame();
        }
        else if (this.score > this.target) {
            this.losses += 1;
            this.readyNewGame();
        }
        this.updateDomScoreboard();
    };
    ;
    Scoreboard.prototype.getRandomTarget = function () {
        var max = 100;
        var min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };
    ;
    Scoreboard.prototype.updateDomScoreboard = function () {
        document.getElementById('target').innerHTML = this.target.toString();
        document.getElementById('score').innerHTML = this.score.toString();
        document.getElementById('wins').innerHTML = this.wins.toString();
        document.getElementById('losses').innerHTML = this.losses.toString();
    };
    ;
    return Scoreboard;
}());
;
var scoreboard = new Scoreboard();
new Engrams();
//# sourceMappingURL=app.js.map