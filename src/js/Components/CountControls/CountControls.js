import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';

export default class CountControls extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('COUNT', this.updateMyself);
    }

    init() {
        ['increment', 'decrement', 'updateMyself'].forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = {
            quantifier: 3,
            value: 3,
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

    updateMyself(subState) {
        this.updateState(subState);
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
