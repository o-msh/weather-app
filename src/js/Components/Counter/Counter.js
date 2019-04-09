import Component from '../../Framework/Component';

export default class Counter extends Component {
    constructor(host, props) {
        super(host, props);
    }

    initHandlers() {
        ['increment', 'decrement'].forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = {
            value: this.props.value * 2,
            quantifier: 5,
        }
    }

    increment() {
        this.updateState({
            value: this.state.value + this.state.quantifier,
        });
    }

    decrement() {
        this.updateState({
            value: this.state.value - this.state.quantifier,
        });
    }

    render() {
        return [
            {
                tag: 'button',
                content: '-',
                eventHandlers: [
                    {
                        type: 'click',
                        handler: this.decrement,
                    },
                ],
            },
            {
                tag: 'span',
                content: this.state.value,
                classList: 'even-nicer',
            },
            {
                tag: 'button',
                content: '+',
                eventHandlers: [
                    {
                        type: 'click',
                        handler: this.increment,
                    },
                ],
            },
        ]
    }
}
