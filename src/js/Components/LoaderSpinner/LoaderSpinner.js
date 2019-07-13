import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class LoaderSpinner extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('LOADERSPINNERTOGGLE', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself']);
        this.state = {
            showLoader: false,
        };
    }

    updateMyself(subState) {
        this.updateState(subState);
    }

    render() {
        return [
            {
                tag: 'div',
                classList: this.state.showLoader
                    ? ['autocomplete__icon-container', 'autocomplete__icon-container_visible_true']
                    : ['autocomplete__icon-container', 'autocomplete__icon-container_visible_false'],
                children: [
                    {
                        tag: 'i',
                        classList: 'loader',
                    },
                ],
            },
        ];
    }
}
