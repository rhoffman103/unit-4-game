interface ScoreboardState {
    score: number;
    target: number;
    wins: number;
    losses: number;
};

interface ScoreboardClickObj extends ScoreboardState {
    isNewGame: boolean;
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
    private listeners: Function[] = [];
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

    scoreClickHandler(engramValue: number) {
        let _this = this;
        _this.score += engramValue;
        let win = 0;
        let loss = 0;

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
        };

        _this.update();
    };

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    };

    triggerListeners() {
        let _this = this;
        for (const listenerFn of _this.listeners) {
            listenerFn(<ScoreboardState>{
                score: _this.score,
                target: _this.target,
                wins: _this.wins,
                losses: _this.losses
            });
        };
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