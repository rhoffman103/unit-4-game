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
        var _this = _this_1;
        _this.subscribeToState();
        _this.render();
        return _this_1;
    }
    ;
    Scoreboard.prototype.update = function (state) {
        var _this = this;
        _this.targetChild.changeValue(state.target);
        _this.scoreChild.changeValue(state.score);
        _this.progressChild.changeValues(state.wins, state.losses);
    };
    ;
    Scoreboard.prototype.subscribeToState = function () {
        var _this_1 = this;
        gameState.addListener(function (state) {
            _this_1.update(state);
        });
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