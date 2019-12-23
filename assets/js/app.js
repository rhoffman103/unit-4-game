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
    Engrams.prototype.clickHandler = function (element) {
        console.log(element.getAttribute('value'));
    };
    ;
    Engrams.prototype.renderEngrams = function () {
        var _this = this;
        var engramsDiv = document.getElementById('engrams');
        var engramsFragment = document.createDocumentFragment();
        this.engrams.forEach(function (engram) {
            var img = document.createElement('img');
            img.setAttribute('class', 'clickable-engram engram-btn');
            img.setAttribute('src', "./assets/images/" + engram.imageName);
            img.setAttribute('alt', 'engram');
            img.setAttribute('value', engram.value.toString());
            img.addEventListener('click', function (event) {
                _this.clickHandler(event.currentTarget);
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
new Engrams();
//# sourceMappingURL=app.js.map