export default class Component {
    constructor(host, props = {}) {
        this.host = host;
        this.props = props;
        this._render();
    }

    _render() {
        this.host.innerHTML = '';
        const content = this.render();
        if (typeof content === 'string') {
            this.host.innerHTML = content;
        } else {
            content.map(this._vDomPrototypeElementToHtmlElement)
                .forEach(htmlElement => {
                    this.host.appendChild(htmlElement);
                });
        }
    }

    render() { }

    _vDomPrototypeElementToHtmlElement(element) {
        if (typeof element === 'string') {
            const htmlElement = document.createElement('div');
            htmlElement.innerHTML = element;
            return htmlElement;
        } else {
            if (element.tag) {
                if (typeof element.tag === 'function') {
                    const container = document.createElement('div');
                    new element.tag(container, element.props);
                    return container;
                } else {
                    const container = document.createElement(element.tag);
                    if (element.content) {
                        container.innerHTML = element.content;
                    }
                    ['classList', 'attributes'].forEach(item => {
                        if (element[item] && !Array.isArray(element[item])) {
                            element[item] = [element[item]];
                        }
                    });
                    if (element.classList) {
                        container.classList.add(...element.classList);
                    }
                    if (element.attributes) {
                        element.attributes.forEach(attributeSpec => {
                            container.setAttribute(attributeSpec.name, attributeSpec.value);
                        });
                    }
                    return container;
                }
            }
            return element;
        }
    }
}
