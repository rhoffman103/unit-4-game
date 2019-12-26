"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
;
var State = /** @class */ (function () {
    function State(initialState) {
        var _this_1 = this;
        this.listeners = [];
        this._state = {};
        this.initialized = false;
        this.initializeState = function (initialState) {
            var _this = _this_1;
            if (!_this.initialized) {
                _this._state = initialState;
                _this.initialized = true;
            }
        };
        this.triggerListeners = function () {
            console.log('State: ', _this_1._state);
            for (var _i = 0, _a = _this_1.listeners; _i < _a.length; _i++) {
                var listenerFn = _a[_i];
                listenerFn(_this_1._state);
            }
        };
        this.getState = function () {
            return __assign({}, _this_1._state);
        };
        this.addListener = function (listenerFn) {
            _this_1.listeners.push(listenerFn);
            listenerFn(_this_1._state);
        };
        this.updateState = function (stateChange) {
            _this_1._state = __assign(__assign({}, _this_1._state), stateChange);
            _this_1.triggerListeners();
        };
        if (initialState)
            this._state = __assign({}, initialState);
    }
    ;
    return State;
}());
;
//# sourceMappingURL=stateClass.js.map