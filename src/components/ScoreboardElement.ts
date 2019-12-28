import TemplateComponent from '../baseClasses/TemplateComponent';

export default class ScoreboardElement extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
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