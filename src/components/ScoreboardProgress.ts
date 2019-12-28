import TemplateComponent from '../baseClasses/TemplateComponent';

export default class ScoreboardProgress extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
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