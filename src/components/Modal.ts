import TemplateComponent from '../baseClasses/TemplateComponent';

export default class Modal extends TemplateComponent<HTMLDivElement, HTMLDivElement> {
   
    constructor(private message: string) {
        super('modal-template', 'modal-container', 'parent', 'engram-modal');
        this.configure();
    };

    show() {
        this.element.style.display = 'block';
    };

    remove() {
        this.element.removeEventListener('click', this.handleClick);
        this.element.remove();
    };

    handleClick = (event: Event) => {
        const modal = event.target as HTMLElement;
        const id = modal.id || '';
        if (id === 'close-modal' || id === 'engram-modal') {
            this.remove();
        };
    };

    configure() {
        this.element.addEventListener('click', this.handleClick);
        this.element.getElementsByClassName('modal-message')[0]!.textContent = this.message;
        this.show();
    };

    render() { };
};