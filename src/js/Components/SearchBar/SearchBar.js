import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('USERINPUT', this.updateMyself);
    }

    init() {
        bindScope(this, ['onUserInput', 'onUserSearch', 'updateMyself']);
        this.state = {};
    }

    onUserInput({ target }) {
        AppState.update('USERINPUT', {
            'city': target.value.trim(),
        });
    }

    onUserSearch() {
        AppState.update('USERSEARCH', this.state);
    }

    updateMyself(subState) {
        this.updateState(subState, false);
    }

    render() {
        return [
            {
                tag: 'input',
                attributes: [
                    {
                        name: 'type',
                        value: 'text',
                    },
                    {
                        name: 'autocomplete',
                        value: 'off',
                    },
                ],
                eventHandlers: [
                    {
                        type: 'input',
                        handler: this.onUserInput,
                    },
                ],
            },
            {
                tag: 'button',
                content: 'Search',
                eventHandlers: [
                    {
                        type: 'click',
                        handler: this.onUserSearch,
                    },
                ],
            },
        ]
    }
}
