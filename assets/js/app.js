"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];
;
;
var Engram = /** @class */ (function (_super) {
    __extends(Engram, _super);
    function Engram(image, _value, clickHandler) {
        var _this_1 = _super.call(this, 'engram-template', 'engrams-list', 'child') || this;
        _this_1.image = image;
        _this_1._value = _value;
        _this_1.clickHandler = clickHandler;
        _this_1.configureElement();
        return _this_1;
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
    Engram.prototype.render = function () { };
    ;
    return Engram;
}(TemplateComponent));
;
var EngramList = /** @class */ (function (_super) {
    __extends(EngramList, _super);
    function EngramList(images) {
        var _this_1 = _super.call(this, 'engrams-container-template', 'engrams-container', 'parent') || this;
        _this_1.images = images;
        _this_1.engrams = [];
        _this_1.handleClickLogic = function (clickValue) {
            var _this = _this_1;
            scoreboard.scoreClickHandler(clickValue, function (scoreboardObj) {
                if (scoreboardObj.isNewGame) {
                    _this.randomizeEngramValues(12);
                    _this.update();
                }
            });
        };
        _this_1.configure();
        _this_1.render();
        return _this_1;
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
    EngramList.prototype.configure = function () {
        var _this = this;
        _this.engrams = _this.images.map(function (img) { return new Engram(img, 0, _this.handleClickLogic); });
        _this.randomizeEngramValues(12);
    };
    ;
    EngramList.prototype.update = function () {
        this.randomizeEngramValues(12);
    };
    ;
    EngramList.prototype.render = function () {
        var listFragment = document.createDocumentFragment();
        this.engrams.forEach(function (engram) {
            listFragment.appendChild(engram.element);
        });
        document.getElementById('engrams-list').appendChild(listFragment);
    };
    ;
    return EngramList;
}(TemplateComponent));
;
var Scoreboard = /** @class */ (function () {
    function Scoreboard() {
        this.score = 0;
        this.wins = 0;
        this.losses = 0;
        this.target = 0;
        var _this = this;
        _this.target = _this.getRandomTarget();
        _this.updateDomScoreboard();
    }
    ;
    Scoreboard.prototype.readyNewGame = function () {
        var _this = this;
        _this.target = _this.getRandomTarget();
        _this.score = 0;
        _this.updateDomScoreboard();
    };
    ;
    Scoreboard.prototype.scoreClickHandler = function (engramValue, callback) {
        var _this = this;
        _this.score += +engramValue;
        var isNewGame = false;
        if (_this.score === _this.target) {
            _this.wins += 1;
            isNewGame = true;
            _this.readyNewGame();
        }
        else if (_this.score > _this.target) {
            _this.losses += 1;
            isNewGame = true;
            _this.readyNewGame();
        }
        _this.updateDomScoreboard();
        if (callback) {
            callback({
                score: _this.score,
                target: _this.target,
                wins: _this.wins,
                losses: _this.losses,
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
        var _this = this;
        document.getElementById('target').innerHTML = _this.target.toString();
        document.getElementById('score').innerHTML = _this.score.toString();
        document.getElementById('wins').innerHTML = _this.wins.toString();
        document.getElementById('losses').innerHTML = _this.losses.toString();
    };
    ;
    return Scoreboard;
}());
;
var scoreboard = new Scoreboard();
new EngramList(engramImages);
//# sourceMappingURL=app.js.map