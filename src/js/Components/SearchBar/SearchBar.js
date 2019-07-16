import Component from '../../Framework/Component';
import AutoComplete from '../AutoComplete';
import LoaderSpinner from '../LoaderSpinner';
import SearchButton from '../SearchButton';
import AppState from '../../Services/AppState';
import { bindScope, debounce } from '../../utils';
import '../../Services/WeatherDataService';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        this.updateMyself = debounce(this.updateMyself, 500);
        AppState.watch('USERINPUT', this.updateMyself);
        AppState.watch('SELECTEDCITY', this.onSelectedCity);
    }

    init() {
        bindScope(this, ['onUserInput', 'onFormSubmit', 'onSelectedCity', 'updateMyself']);
        this.state = {};
    }

    onUserInput({ target }) {
        AppState.update('CHANGESEARCHALLOW', { allowSearch: false });
        AppState.update('USERINPUT', {
            city: target.value.trim(),
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        AppState.update('USERSEARCH', this.state);
    }

    onSelectedCity(city) {
        this.updateState({ city });
    }

    updateMyself(subState) {
        this.updateState(subState, false);
        AppState.update('AUTOCOMPLETESEARCH', this.state.city);
    }

    render() {
        return [
            {
                tag: 'form',
                classList: 'search-bar',
                attributes: [
                    {
                        name: 'autocomplete',
                        value: 'off',
                    },
                ],
                children: [
                    {
                        tag: 'div',
                        classList: 'autocomplete',
                        children: [
                            {
                                tag: 'input',
                                classList: 'autocomplete__input',
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
                                        name: 'value',
                                        value: this.state.city || '',
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
                                tag: LoaderSpinner,
                            },
                            {
                                tag: 'div',
                                classList: 'autocomplete__list',
                                children: [
                                    {
                                        tag: AutoComplete,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: SearchButton,
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
