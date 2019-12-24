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

class Engram {
    templateElement: HTMLTemplateElement;
    element: HTMLImageElement;

    get value() {
        return this._value;
    };

    constructor(
        private image: string,
        private _value: number,
        private clickHandler: Function
    ) {
        this.templateElement = document.getElementById('engram-template')! as HTMLTemplateElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLImageElement;

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
};

class EngramList {
    engrams: Engram[] = [];

    constructor(private images: string[]) {
        this.configure();
        this.renderEngrams();
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

    private update() {
        this.randomizeEngramValues(12);
    };

    private configure() {
        this.engrams = this.images.map((img) => new Engram(img, 0, this.handleClickLogic));
        this.randomizeEngramValues(12);
    };

    renderEngrams() {
        const listFragment = document.createDocumentFragment();
        this.engrams.forEach(engram => {
          listFragment.appendChild(engram.element);
        });
        document.getElementById('engrams')!.appendChild(listFragment);
    };
};

class Scoreboard {
    score = 0;
    wins = 0;
    losses = 0;
    target = 0;

    constructor() {
        this.target = this.getRandomTarget();
        this.updateDomScoreboard();
    };

    readyNewGame() {
        this.target = this.getRandomTarget();
        this.score = 0;
        this.updateDomScoreboard();
    };

    scoreClickHandler(engramValue: number, callback?: Function) {
        this.score += +engramValue;
        let isNewGame = false;

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
            callback(<ScoreboardClickObj>{
                score: this.score,
                target: this.target,
                wins: this.wins,
                losses: this.losses,
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
        document.getElementById('target')!.innerHTML = this.target.toString();
        document.getElementById('score')!.innerHTML = this.score.toString();
        document.getElementById('wins')!.innerHTML = this.wins.toString();
        document.getElementById('losses')!.innerHTML = this.losses.toString();
    };
};

const scoreboard = new Scoreboard();
new EngramList(engramImages);