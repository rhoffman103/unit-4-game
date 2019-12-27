import TemplateComponent from '../baseClasses/TemplateComponent';
import game from '../state/GameState';

export default class Engram extends TemplateComponent<HTMLDivElement, HTMLImageElement> {
    private _value = 0;

    get value() {
        return this._value;
    };

    constructor(private image: string) {
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
            game.scoreClickHandler(_this.value);
        });
    };

    render() { };
};