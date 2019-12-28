/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Scoreboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Scoreboard */ "./src/components/Scoreboard.ts");
/* harmony import */ var _components_EngramList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/EngramList */ "./src/components/EngramList.ts");
/* harmony import */ var _constants_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/index */ "./src/constants/index.ts");



new _components_Scoreboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
new _components_EngramList__WEBPACK_IMPORTED_MODULE_1__["default"](_constants_index__WEBPACK_IMPORTED_MODULE_2__["engramImages"]);


/***/ }),

/***/ "./src/baseClasses/State.ts":
/*!**********************************!*\
  !*** ./src/baseClasses/State.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __assign = (undefined && undefined.__assign) || function () {
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
/* harmony default export */ __webpack_exports__["default"] = (State);
;


/***/ }),

/***/ "./src/baseClasses/TemplateComponent.ts":
/*!**********************************************!*\
  !*** ./src/baseClasses/TemplateComponent.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var TemplateComponent = /** @class */ (function () {
    function TemplateComponent(templateId, hostId, attachToHost, newElementId, position) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId && newElementId !== 'none') {
            this.element.id = newElementId;
        }
        if (attachToHost === 'parent' ||
            attachToHost === undefined) {
            this.attachToHost(position || 'beforeend');
        }
    }
    ;
    TemplateComponent.prototype.attachToHost = function (position) {
        this.hostElement.insertAdjacentElement(position, this.element);
    };
    ;
    return TemplateComponent;
}());
/* harmony default export */ __webpack_exports__["default"] = (TemplateComponent);
;


/***/ }),

/***/ "./src/components/Engram.ts":
/*!**********************************!*\
  !*** ./src/components/Engram.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
/* harmony import */ var _state_GameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/GameState */ "./src/state/GameState.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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


var Engram = /** @class */ (function (_super) {
    __extends(Engram, _super);
    function Engram(image) {
        var _this_1 = _super.call(this, 'engram-template', 'engrams-list', 'child') || this;
        _this_1.image = image;
        _this_1._value = 0;
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
            _state_GameState__WEBPACK_IMPORTED_MODULE_1__["default"].scoreClickHandler(_this.value);
        });
    };
    ;
    Engram.prototype.render = function () { };
    ;
    return Engram;
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Engram);
;


/***/ }),

/***/ "./src/components/EngramList.ts":
/*!**************************************!*\
  !*** ./src/components/EngramList.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
/* harmony import */ var _state_GameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/GameState */ "./src/state/GameState.ts");
/* harmony import */ var _Engram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Engram */ "./src/components/Engram.ts");
/* harmony import */ var _constants_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/index */ "./src/constants/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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




var EngramList = /** @class */ (function (_super) {
    __extends(EngramList, _super);
    function EngramList(images) {
        var _this_1 = _super.call(this, 'engrams-container-template', 'engrams-container', 'parent') || this;
        _this_1.images = images;
        _this_1.engrams = [];
        _this_1.scoreboardTarget = _state_GameState__WEBPACK_IMPORTED_MODULE_1__["default"].getState().target;
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
    EngramList.prototype.subscribeToState = function () {
        var _this = this;
        _state_GameState__WEBPACK_IMPORTED_MODULE_1__["default"].addListener(function (state) {
            if (state.score > _this.scoreboardTarget) {
                _this.randomizeEngramValues(12);
                _this.update();
            }
            else if (state.score === 0) {
                _this.scoreboardTarget = state.target;
            }
        });
    };
    ;
    EngramList.prototype.configure = function () {
        var _this = this;
        _this.subscribeToState();
        _this.engrams = _this.images.map(function (img) { return new _Engram__WEBPACK_IMPORTED_MODULE_2__["default"](img); });
        _this.engrams.forEach(function (engram, i) {
            engram.element.classList.add('animated', _constants_index__WEBPACK_IMPORTED_MODULE_3__["engramRenderAnimations"][i].animation, _constants_index__WEBPACK_IMPORTED_MODULE_3__["engramRenderAnimations"][i].delay);
        });
        setTimeout(function () {
            _this.engrams.forEach(function (engram, i) {
                engram.element.classList.remove('animated', _constants_index__WEBPACK_IMPORTED_MODULE_3__["engramRenderAnimations"][i].animation, _constants_index__WEBPACK_IMPORTED_MODULE_3__["engramRenderAnimations"][i].delay);
            });
        }, 1800);
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
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (EngramList);
;


/***/ }),

/***/ "./src/components/Modal.ts":
/*!*********************************!*\
  !*** ./src/components/Modal.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(message) {
        var _this = _super.call(this, 'modal-template', 'modal-container', 'parent', 'engram-modal') || this;
        _this.message = message;
        _this.handleClick = function (event) {
            var modal = event.target;
            var id = modal.id || '';
            if (id === 'close-modal' || id === 'engram-modal') {
                _this.remove();
            }
            ;
        };
        _this.configure();
        return _this;
    }
    ;
    Modal.prototype.show = function () {
        this.element.style.display = 'block';
    };
    ;
    Modal.prototype.remove = function () {
        this.element.removeEventListener('click', this.handleClick);
        this.element.remove();
    };
    ;
    Modal.prototype.configure = function () {
        this.element.addEventListener('click', this.handleClick);
        this.element.getElementsByClassName('modal-message')[0].textContent = this.message;
        this.show();
    };
    ;
    Modal.prototype.render = function () { };
    ;
    return Modal;
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Modal);
;


/***/ }),

/***/ "./src/components/Scoreboard.ts":
/*!**************************************!*\
  !*** ./src/components/Scoreboard.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
/* harmony import */ var _state_GameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/GameState */ "./src/state/GameState.ts");
/* harmony import */ var _ScoreboardElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScoreboardElement */ "./src/components/ScoreboardElement.ts");
/* harmony import */ var _ScoreboardProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScoreboardProgress */ "./src/components/ScoreboardProgress.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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




var Scoreboard = /** @class */ (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard() {
        var _this_1 = _super.call(this, 'row-template', 'game-row', 'parent') || this;
        _this_1.targetChild = new _ScoreboardElement__WEBPACK_IMPORTED_MODULE_2__["default"]('scoreboard-template', 'Target');
        _this_1.scoreChild = new _ScoreboardElement__WEBPACK_IMPORTED_MODULE_2__["default"]('scoreboard-template', 'Score');
        _this_1.progressChild = new _ScoreboardProgress__WEBPACK_IMPORTED_MODULE_3__["default"]('progress-template', 'Progress');
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
        _state_GameState__WEBPACK_IMPORTED_MODULE_1__["default"].addListener(function (state) {
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
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Scoreboard);
;


/***/ }),

/***/ "./src/components/ScoreboardElement.ts":
/*!*********************************************!*\
  !*** ./src/components/ScoreboardElement.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
        var _this = _super.call(this, templateId, 'game-row', 'child') || this;
        _this.scoreboardTitle = scoreboardTitle;
        _this.scoreboardValue = 0;
        _this.configureElement();
        return _this;
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
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ScoreboardElement);
;


/***/ }),

/***/ "./src/components/ScoreboardProgress.ts":
/*!**********************************************!*\
  !*** ./src/components/ScoreboardProgress.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/TemplateComponent */ "./src/baseClasses/TemplateComponent.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var ScoreboardProgress = /** @class */ (function (_super) {
    __extends(ScoreboardProgress, _super);
    function ScoreboardProgress(templateId, scoreboardTitle) {
        var _this = _super.call(this, templateId, 'game-row', 'child') || this;
        _this.scoreboardTitle = scoreboardTitle;
        _this.configureElement();
        return _this;
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
}(_baseClasses_TemplateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ScoreboardProgress);
;


/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/*! exports provided: engramImages, engramRenderAnimations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "engramImages", function() { return engramImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "engramRenderAnimations", function() { return engramRenderAnimations; });
var engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];
var engramRenderAnimations = [
    {
        animation: 'bounceInRight',
        delay: 'delay-0'
    }, {
        animation: 'bounceInUp',
        delay: 'delay-400'
    }, {
        animation: 'bounceIn',
        delay: 'delay-800'
    }, {
        animation: 'bounceInDown',
        delay: 'delay-600'
    }, {
        animation: 'bounceInLeft',
        delay: 'delay-200'
    }
];


/***/ }),

/***/ "./src/state/GameState.ts":
/*!********************************!*\
  !*** ./src/state/GameState.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseClasses_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseClasses/State */ "./src/baseClasses/State.ts");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Modal */ "./src/components/Modal.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
            if (win)
                new _components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"](currentState.wins % 5 === 0 ? 'This is amazing! ' : 'Your legend grows');
            if (loss)
                new _components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"]('Your light fades away...');
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
}(_baseClasses_State__WEBPACK_IMPORTED_MODULE_0__["default"]));
;
var game = new Game();
/* harmony default export */ __webpack_exports__["default"] = (game);


/***/ })

/******/ });