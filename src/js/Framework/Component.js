export default class Component {
    constructor(host, props = {}) {
        this.host = host;
        this.props = props;
        this.bindEverything();
        this._render();
    }

    bindEverything() { }

    _render() {
        this.host.innerHTML = '';
        let content = this.render();
        if (!Array.isArray(content)) {
            content = [content];
        }
        content.map(item => this._vDomPrototypeElementToHtmlElement(item))
            .forEach(htmlElement => {
                this.host.appendChild(htmlElement);
            });
    }

    render() { }

    _vDomPrototypeElementToHtmlElement(element) {
        if (typeof element === 'string') {
            let container;
            const containsHtmlTags = /[<>&]/.test(element);
            if (containsHtmlTags) {
                container = document.createElement('div');
                container.innerHTML = element;
            } else {
                container = document.createTextNode(element);
            }
            return container;
        } else {
            if (element.tag) {
                if (typeof element.tag === 'function') {
                    const container = document.createElement('div');
                    new element.tag(container, element.props);
                    return container;
                } else {
                    const container = document.createElement(element.tag);
                    ['classList', 'attributes', 'children'].forEach(item => {
                        if (element[item] && !Array.isArray(element[item])) {
                            element[item] = [element[item]];
                        }
                    });
                    if (element.content !== undefined) {
                        container.innerHTML = element.content;
                    }
                    if (element.classList) {
                        container.classList.add(...element.classList);
                    }
                    if (element.attributes) {
                        element.attributes.forEach(attributeSpec => {
                            container.setAttribute(attributeSpec.name, attributeSpec.value);
                        });
                    }
                    if (element.eventHandlers) {
                        Object.keys(element.eventHandlers).forEach(eventType => {
                            container.addEventListener(eventType, element.eventHandlers[eventType]);
                        });
                    }
                    if (element.children) {
                        element.children.forEach(item => {
                            const htmlElement = this._vDomPrototypeElementToHtmlElement(item);
                            container.appendChild(htmlElement);
                        });
                    }
                    return container;
                }
            }
            return element;
        }
    }
}
