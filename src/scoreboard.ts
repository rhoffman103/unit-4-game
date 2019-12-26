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

    constructor() {
        super('row-template', 'game-row', 'parent');
        let _this = this;
        _this.subscribeToState();
        _this.render();
    };

    update(state: GameState) {
        let _this = this;
        _this.targetChild.changeValue(state.target);
        _this.scoreChild.changeValue(state.score);
        _this.progressChild.changeValues(state.wins, state.losses);
    };

    subscribeToState() {
        gameState.addListener((state: GameState) => {
            this.update(state)
        });
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