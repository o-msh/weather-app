import Component from '../../Framework/Component';
import AutoComplete from '../AutoComplete';
import AppState from '../../Services/AppState';
import { bindScope, debounce } from '../../utils';
import '../../Services/WeatherDataService';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        this.updateMyself = debounce(this.updateMyself, 1000);
        AppState.watch('USERINPUT', this.updateMyself);
    }

    init() {
        bindScope(this, ['onUserInput', 'onFormSubmit', 'updateMyself', 'onAutoCompleteClick']);
        this.state = {};
    }

    onUserInput({ target }) {
        const value = target.value.trim();
        if (value.length > 0) {
            AppState.update('USERINPUT', {
                'city': target.value.trim(),
            });
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        AppState.update('USERSEARCH', this.state);
    }

    updateMyself(subState) {
        this.updateState(subState, false);
        AppState.update('AUTOCOMPLETESEARCH', this.state.city);
    }

    render() {
        return [
            {
                tag: 'form',
                classList: ['search-bar'],
                attributes: [
                    {
                        name: 'autocomplete',
                        value: 'off',
                    },
                ],
                children: [
                    {
                        tag: 'div',
                        classList: ['autocomplete'],
                        children: [
                            {
                                tag: 'input',
                                classList: ['autocomplete__input'],
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
                                ],
                                eventHandlers: [
                                    {
                                        type: 'input',
                                        handler: this.onUserInput,
                                    },
                                ],
                            },
                            {
                                tag: 'div',
                                classList: ['autocomplete__icon-container'],
                                children: [
                                    {
                                        tag: 'i',
                                        classList: ['loader'],
                                    },
                                ],
                            },
                            {
                                tag: 'div',
                                classList: ['autocomplete__list'],
                                children: [
                                    {
                                        tag: AutoComplete,
                                    },
                                ],
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
            },
        ];
    }
}
