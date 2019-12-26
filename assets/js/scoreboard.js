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
;
;
var ScoreboardElement = /** @class */ (function (_super) {
    __extends(ScoreboardElement, _super);
    function ScoreboardElement(templateId, scoreboardTitle) {
        var _this_1 = _super.call(this, templateId, 'game-row', 'child') || this;
        _this_1.scoreboardTitle = scoreboardTitle;
        _this_1.scoreboardValue = 0;
        _this_1.configureElement();
        return _this_1;
    }
    ;
    ScoreboardElement.prototype.configureElement = function () {
        this.element.getElementsByClassName('scoreboard-title')[0].innerHTML = this.scoreboardTitle.toString();
        this.element.getElementsByClassName('scoreboard-value')[0].innerHTML = this.scoreboardValue.toString();
    };
    ;
    ScoreboardElement.prototype.changeValue = function (value) {
        this.scoreboardValue = value;
        this.element.getElementsByClassName('scoreboard-value')[0].innerHTML = value.toString();
    };
    ;
    ScoreboardElement.prototype.render = function () { };
    ;
    return ScoreboardElement;
}(TemplateComponent));
;
var ScoreboardProgress = /** @class */ (function (_super) {
    __extends(ScoreboardProgress, _super);
    function ScoreboardProgress(templateId, scoreboardTitle) {
        var _this_1 = _super.call(this, templateId, 'game-row', 'child') || this;
        _this_1.scoreboardTitle = scoreboardTitle;
        _this_1.configureElement();
        return _this_1;
    }
    ;
    ScoreboardProgress.prototype.configureElement = function () {
        this.element.getElementsByClassName('scoreboard-title')[0].innerHTML = this.scoreboardTitle.toString();
    };
    ;
    ScoreboardProgress.prototype.changeValues = function (wins, losses) {
        this.element.getElementsByClassName('wins-value')[0].innerHTML = wins.toString();
        this.element.getElementsByClassName('losses-value')[0].innerHTML = losses.toString();
    };
    ;
    ScoreboardProgress.prototype.render = function () { };
    ;
    return ScoreboardProgress;
}(TemplateComponent));
;
var Scoreboard = /** @class */ (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard() {
        var _this_1 = _super.call(this, 'row-template', 'game-row', 'parent') || this;
        _this_1.targetChild = new ScoreboardElement('scoreboard-template', 'Target');
        _this_1.scoreChild = new ScoreboardElement('scoreboard-template', 'Score');
        _this_1.progressChild = new ScoreboardProgress('progress-template', 'Progress');
        _this_1.listeners = [];
        _this_1.score = 0;
        _this_1.wins = 0;
        _this_1.losses = 0;
        _this_1.target = 0;
        var _this = _this_1;
        _this.target = _this.getRandomTarget();
        _this.configure();
        return _this_1;
    }
    ;
    Scoreboard.prototype.update = function () {
        var _this = this;
        _this.targetChild.changeValue(_this.target);
        _this.scoreChild.changeValue(_this.score);
        _this.progressChild.changeValues(_this.wins, _this.losses);
    };
    ;
    Scoreboard.prototype.readyNewGame = function () {
        var _this = this;
        _this.target = _this.getRandomTarget();
        _this.score = 0;
        _this.update();
    };
    ;
    Scoreboard.prototype.configure = function () {
        this.readyNewGame();
        this.render();
    };
    ;
    Scoreboard.prototype.scoreClickHandler = function (engramValue) {
        var _this = this;
        _this.score += engramValue;
        var win = 0;
        var loss = 0;
        if (_this.score === _this.target) {
            win += 1;
        }
        else if (_this.score > _this.target) {
            loss += 1;
        }
        _this.triggerListeners();
        if (win || loss) {
            _this.score = 0;
            _this.wins = _this.wins + win;
            _this.losses = _this.losses + loss;
            _this.target = _this.getRandomTarget();
            _this.triggerListeners();
        }
        ;
        _this.update();
    };
    ;
    Scoreboard.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ;
    Scoreboard.prototype.triggerListeners = function () {
        var _this = this;
        for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn({
                score: _this.score,
                target: _this.target,
                wins: _this.wins,
                losses: _this.losses
            });
        }
        ;
    };
    ;
    Scoreboard.prototype.getRandomTarget = function () {
        var max = 100;
        var min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };
    ;
    Scoreboard.prototype.render = function () {
        var _this = this;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(_this.targetChild.element);
        fragment.appendChild(_this.scoreChild.element);
        fragment.appendChild(_this.progressChild.element);
        _this.element.appendChild(fragment);
    };
    ;
    return Scoreboard;
}(TemplateComponent));
;
//# sourceMappingURL=scoreboard.js.map