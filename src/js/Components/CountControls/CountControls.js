import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';

export default class CountControls extends Component {
    constructor(host, props) {
        super(host, props);
    }

    init() {
        ['increment', 'decrement'].forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = {
            value: this.props.value * 2,
            quantifier: 5,
        }
    }

    increment() {
        AppState.update('COUNT', {
            value: this.state.value + this.state.quantifier,
        });
    }

    decrement() {
        AppState.update('COUNT', {
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
