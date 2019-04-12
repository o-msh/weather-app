import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';

export default class PrettyNumber extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('COUNT', this.updateMyself);
    }

    init() {
        ['updateMyself'].forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = {};
    }

    updateMyself(subState) {
        this.updateState(subState);
    }

    render() {
        return [
            {
                tag: 'div',
                content: this.state.value ? this.state.value : 'Default',
                classList: 'even-nicer',
            },
        ]
    }
}
