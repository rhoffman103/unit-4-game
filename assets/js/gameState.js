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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this_1 = _super.call(this) || this;
        _this_1.initializeState({
            target: _this_1.getRandomTarget(),
            score: 0,
            wins: 0,
            losses: 0
        });
        return _this_1;
    }
    ;
    Game.prototype.getRandomTarget = function () {
        var max = 100;
        var min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };
    ;
    Game.prototype.scoreClickHandler = function (engramValue) {
        var _this = this;
        var currentState = this.getState();
        var newScore = currentState.score += engramValue;
        var win = 0;
        var loss = 0;
        if (newScore === currentState.target) {
            win += 1;
        }
        else if (newScore > currentState.target) {
            loss += 1;
        }
        this.updateState({ score: newScore });
        if (win || loss) {
            _this.updateState({
                score: 0,
                wins: currentState.wins + win,
                losses: currentState.losses + loss,
                target: _this.getRandomTarget()
            });
        }
        ;
    };
    ;
    return Game;
}(State));
;
var gameState = new Game();
//# sourceMappingURL=gameState.js.map