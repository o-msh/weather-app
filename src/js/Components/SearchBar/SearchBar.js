import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';
import '../../Services/WeatherDataService';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('USERINPUT', this.updateMyself);
    }

    init() {
        bindScope(this, ['onUserInput', 'onFormSubmit', 'updateMyself']);
        this.state = {};
    }

    onUserInput({ target }) {
        AppState.update('USERINPUT', {
            'city': target.value.trim(),
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        AppState.update('USERSEARCH', this.state);
    }

    updateMyself(subState) {
        this.updateState(subState, false);
    }

    render() {
        return [
            {
                tag: 'form',
                children: [
                    {
                        tag: 'input',
                        attributes: [
                            {
                                name: 'type',
                                value: 'text',
                            },
                            {
                                name: 'placeholder',
                                value: 'Enter city',
                            },
                            {
                                name: 'required',
                                value: 'true',
                            },
                            {
                                name: 'title',
                                value: 'Enter city',
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
                        attributes: [
                            {
                                name: 'type',
                                value: 'submit',
                            },
                        ],
                        content: 'Search',
                    },
                ],
                eventHandlers: [
                    {
                        type: 'submit',
                        handler: this.onFormSubmit,
                    },
                ],
            }
        ]
    }
}
