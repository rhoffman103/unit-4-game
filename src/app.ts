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

    render() { };
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

class ScoreboardElement extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
    public scoreboardValue = 0;

    constructor(
        templateId: string,
        private scoreboardTitle: string
    ) {
        super(templateId, 'game-row', 'child');
        this.configureElement();
    };

    configureElement() {
        this.element.getElementsByClassName('scoreboard-title')[0].innerHTML = this.scoreboardTitle.toString();
        this.element.getElementsByClassName('scoreboard-value')[0].innerHTML = this.scoreboardValue.toString();
    };

    public changeValue(value: number) {
        this.scoreboardValue = value;
        this.element.getElementsByClassName('scoreboard-value')[0].innerHTML = value.toString();
    };

    render() { };
};

class ScoreboardProgress extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
    constructor(
        templateId: string,
        private scoreboardTitle: string
    ) {
        super(templateId, 'game-row', 'child');
        this.configureElement();
    };

    configureElement() {
        this.element.getElementsByClassName('scoreboard-title')[0].innerHTML = this.scoreboardTitle.toString();
    };

    public changeValues(wins: number, losses: number) {
        this.element.getElementsByClassName('wins-value')[0].innerHTML = wins.toString();
        this.element.getElementsByClassName('losses-value')[0].innerHTML = losses.toString();
    };

    render() { };
};

class Scoreboard extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
    private targetChild = new ScoreboardElement('scoreboard-template', 'Target');
    private scoreChild = new ScoreboardElement('scoreboard-template', 'Score');
    private progressChild = new ScoreboardProgress('progress-template', 'Progress');
    score = 0;
    wins = 0;
    losses = 0;
    target = 0;

    constructor() {
        super('row-template', 'game-row', 'parent');
        let _this = this;
        _this.target = _this.getRandomTarget();
        _this.configure();
    };

    update() {
        let _this = this;
        _this.targetChild.changeValue(_this.target);
        _this.scoreChild.changeValue(_this.score);
        _this.progressChild.changeValues(_this.wins, _this.losses);
    };

    readyNewGame() {
        let _this = this;
        _this.target = _this.getRandomTarget();
        _this.score = 0;
        _this.update();
    };

    configure() {
        this.readyNewGame();
        this.render();
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

        _this.update();
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

    render() {
        let _this = this;
        const fragment = document.createDocumentFragment();
        fragment.appendChild(_this.targetChild.element);
        fragment.appendChild(_this.scoreChild.element);
        fragment.appendChild(_this.progressChild.element);
        _this.element.appendChild(fragment);
    };
};

const scoreboard = new Scoreboard();
new EngramList(engramImages);