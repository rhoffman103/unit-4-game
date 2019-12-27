export type AttachPosition = 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend';
export type ComponentType = 'parent' | 'child';

export default abstract class TemplateComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostId: string,
        attachToHost?: ComponentType | undefined,
        newElementId?: string,
        position?: AttachPosition
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId)! as T;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        if (
            attachToHost === 'parent' ||
            attachToHost === undefined
        ) {
            this.attachToHost(position || 'beforeend');
        }
    };

    private attachToHost(position: AttachPosition) {
        this.hostElement.insertAdjacentElement(position, this.element);
    };

    configure?(): void;
    abstract render(): void;
};