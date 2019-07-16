import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class SearchButton extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('CHANGESEARCHALLOW', this.updateMyself);
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
                tag: 'button',
                attributes: [
                    {
                        name: 'type',
                        value: 'submit',
                    },
                    {
                        name: this.state.allowSearch === true ? 'undisabled' : 'disabled',
                        value: '',
                    },
                ],
                content: 'Search',
            },
        ];
    }
}
