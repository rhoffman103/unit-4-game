import TemplateComponent from '../baseClasses/TemplateComponent';
import game, { GameState } from '../state/GameState';
import Engram from './Engram';
import { engramRenderAnimations } from '../constants/index';

export default class EngramList extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
    engrams: Engram[] = [];
    scoreboardTarget: number;

    constructor(private images: string[]) {
        super('engrams-container-template', 'engrams-container', 'parent');
        this.scoreboardTarget = game.getState().target;
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

    subscribeToState() {
        let _this = this;
        game.addListener((state: GameState) => {
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
        _this.engrams = _this.images.map((img) => new Engram(img));
        
        _this.engrams.forEach((engram, i) => {
            engram.element.classList.add(
                'animated',
                engramRenderAnimations[i].animation,
                engramRenderAnimations[i].delay
            );
        });

        setTimeout(() => {
            _this.engrams.forEach((engram, i) => {
                engram.element.classList.remove(
                    'animated',
                    engramRenderAnimations[i].animation,
                    engramRenderAnimations[i].delay
                );
            });
        }, 1800);

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