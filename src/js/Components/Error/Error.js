import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class Error extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('ERROR', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself']);
        this.state = {};
    }

    updateMyself(subState) {
        this.updateState(subState);
    }

    render() {
        return [
            {
                tag: 'div',
                classList: this.state.error ? 'error' : 'error-hide',
                content: this.state.error || '',
            },
        ];
    }
}
