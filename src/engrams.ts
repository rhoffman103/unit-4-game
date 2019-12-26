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
    scoreboardTarget: number;

    constructor(private images: string[]) {
        super('engrams-container-template', 'engrams-container', 'parent');
        this.scoreboardTarget = scoreboard.target;
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
        scoreboard.scoreClickHandler(clickValue);
    };

    subscribeToState() {
        let _this = this;
        scoreboard.addListener((state: ScoreboardState) => {
            if (state.score > _this.scoreboardTarget) {
                _this.randomizeEngramValues(12);
                _this.update();
            }
            else if (state.score === 0) {
                _this.scoreboardTarget = state.target;
            }
        });
    };

    configure() {
        let _this = this;
        _this.subscribeToState();
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