const engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];

interface EngramInterface {
    imageName: string;
    value: number;
};

interface ScoreboardClickObj {
    score: number;
    target: number;
    wins: number;
    losses: number;
    isNewGame: boolean;
};

class Engram extends TemplateComponent<HTMLDivElement, HTMLImageElement> {
    get value() {
        return this._value;
    };

    constructor(
        private image: string,
        private _value: number,
        private clickHandler: Function
    ) {
        super('engram-template', 'engrams-list', 'child');
        this.configureElement();
    };

    public setValue(val: number) {
        this._value = val;
    };

    configureElement() {
        let _this = this;
        _this.element.src = `./assets/images/${_this.image}`;
        _this.element.addEventListener('click', () => {
            _this.clickHandler(+_this._value);
        });
    };

    render() {};
};

class EngramList extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
    engrams: Engram[] = [];

    constructor(private images: string[]) {
        super('engrams-container-template', 'engrams-container', 'parent');
        this.configure();
        this.render();
    };

    randomizeEngramValues(maxValue: number) {
        let i = 1;
        let remainingNums: number[] = [];

        while (i <= maxValue) {
            remainingNums.push(i);
            i++;
        };

        this.engrams.forEach((engram) => {
            const randNum = Math.floor(Math.random() * remainingNums.length);
            engram.setValue(remainingNums.splice(randNum, 1)[0]);
        });
    };

    handleClickLogic = (clickValue: number) => {
        let _this = this;
        scoreboard.scoreClickHandler(clickValue, (scoreboardObj: ScoreboardClickObj) => {
            if (scoreboardObj.isNewGame) {
                _this.randomizeEngramValues(12);
                _this.update();
            }
        });
    };

    configure() {
        let _this = this;
        _this.engrams = _this.images.map((img) => new Engram(img, 0, _this.handleClickLogic));
        _this.randomizeEngramValues(12);
    };

    private update() {
        this.randomizeEngramValues(12);
    };

    render() {
        const listFragment = document.createDocumentFragment();
        this.engrams.forEach(engram => {
          listFragment.appendChild(engram.element);
        });
        document.getElementById('engrams-list')!.appendChild(listFragment);
    };
};

class Scoreboard {
    score = 0;
    wins = 0;
    losses = 0;
    target = 0;

    constructor() {
        let _this = this;
        _this.target = _this.getRandomTarget();
        _this.updateDomScoreboard();
    };

    readyNewGame() {
        let _this = this;
        _this.target = _this.getRandomTarget();
        _this.score = 0;
        _this.updateDomScoreboard();
    };

    scoreClickHandler(engramValue: number, callback?: Function) {
        let _this = this;
        _this.score += +engramValue;
        let isNewGame = false;

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
            callback(<ScoreboardClickObj>{
                score: _this.score,
                target: _this.target,
                wins: _this.wins,
                losses: _this.losses,
                isNewGame
            });
        }
    };

    private getRandomTarget(): number {
        let max = 100;
        let min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };

    private updateDomScoreboard() {
        let _this = this;
        document.getElementById('target')!.innerHTML = _this.target.toString();
        document.getElementById('score')!.innerHTML = _this.score.toString();
        document.getElementById('wins')!.innerHTML = _this.wins.toString();
        document.getElementById('losses')!.innerHTML = _this.losses.toString();
    };
};

const scoreboard = new Scoreboard();
new EngramList(engramImages);