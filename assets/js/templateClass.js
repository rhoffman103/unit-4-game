"use strict";
var TemplateComponent = /** @class */ (function () {
    function TemplateComponent(templateId, hostId, attachToHost, newElementId, position) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        if (attachToHost === 'parent' ||
            attachToHost === undefined) {
            this.attachToHost(position || 'beforeend');
        }
    }
    ;
    TemplateComponent.prototype.attachToHost = function (position) {
        this.hostElement.insertAdjacentElement(position, this.element);
    };
    ;
    return TemplateComponent;
}());
;
//# sourceMappingURL=templateClass.js.map