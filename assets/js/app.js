"use strict";
var engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];
;
;
var Engram = /** @class */ (function () {
    function Engram(image, _value, clickHandler) {
        this.image = image;
        this._value = _value;
        this.clickHandler = clickHandler;
        this.templateElement = document.getElementById('engram-template');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.configureElement();
    }
    Object.defineProperty(Engram.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Engram.prototype.setValue = function (val) {
        this._value = val;
    };
    ;
    Engram.prototype.configureElement = function () {
        var _this = this;
        _this.element.src = "./assets/images/" + _this.image;
        _this.element.addEventListener('click', function () {
            _this.clickHandler(+_this._value);
        });
    };
    ;
    return Engram;
}());
;
var EngramList = /** @class */ (function () {
    function EngramList(images) {
        var _this_1 = this;
        this.images = images;
        this.engrams = [];
        this.handleClickLogic = function (clickValue) {
            var _this = _this_1;
            scoreboard.scoreClickHandler(clickValue, function (scoreboardObj) {
                if (scoreboardObj.isNewGame) {
                    _this.randomizeEngramValues(12);
                    _this.update();
                }
            });
        };
        this.configure();
        this.renderEngrams();
    }
    ;
    EngramList.prototype.randomizeEngramValues = function (maxValue) {
        var i = 1;
        var remainingNums = [];
        while (i <= maxValue) {
            remainingNums.push(i);
            i++;
        }
        ;
        this.engrams.forEach(function (engram) {
            var randNum = Math.floor(Math.random() * remainingNums.length);
            engram.setValue(remainingNums.splice(randNum, 1)[0]);
        });
    };
    ;
    EngramList.prototype.update = function () {
        this.randomizeEngramValues(12);
    };
    ;
    EngramList.prototype.configure = function () {
        var _this_1 = this;
        this.engrams = this.images.map(function (img) { return new Engram(img, 0, _this_1.handleClickLogic); });
        this.randomizeEngramValues(12);
    };
    ;
    EngramList.prototype.renderEngrams = function () {
        var listFragment = document.createDocumentFragment();
        this.engrams.forEach(function (engram) {
            listFragment.appendChild(engram.element);
        });
        document.getElementById('engrams').appendChild(listFragment);
    };
    ;
    return EngramList;
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
    Scoreboard.prototype.scoreClickHandler = function (engramValue, callback) {
        this.score += +engramValue;
        var isNewGame = false;
        if (this.score === this.target) {
            this.wins += 1;
            isNewGame = true;
            this.readyNewGame();
        }
        else if (this.score > this.target) {
            this.losses += 1;
            isNewGame = true;
            this.readyNewGame();
        }
        this.updateDomScoreboard();
        if (callback) {
            callback({
                score: this.score,
                target: this.target,
                wins: this.wins,
                losses: this.losses,
                isNewGame: isNewGame
            });
        }
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
new EngramList(engramImages);
//# sourceMappingURL=app.js.map