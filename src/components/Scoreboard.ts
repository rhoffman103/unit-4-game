import TemplateComponent from '../baseClasses/TemplateComponent';
import game, { GameState } from '../state/GameState';
import ScoreboardElement from './ScoreboardElement';
import ScoreboardProgress from './ScoreboardProgress';

export default class Scoreboard extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
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
        game.addListener((state: GameState) => {
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