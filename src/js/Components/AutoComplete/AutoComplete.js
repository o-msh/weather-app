import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';
import '../../Services/WeatherDataService';

export default class AutoComplete extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('AUTOCOMPLETELIST', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself', 'selectCity']);
        this.state = {};
    }

    clickToCity({ target }) {
        AppState.update('AUTOCOMPLETELIST', []);
        AppState.update('SELECTEDCITY', target.innerHTML);
    }

    updateMyself({ data }) {
        this.updateState({
            autoCompleteList: data,
        });
    }

    render() {
        const { autoCompleteList } = this.state;
        if (autoCompleteList) {
            if (autoCompleteList.length > 0) {
                return autoCompleteList.map(autoCompleteItem => ({
                    tag: 'div',
                    classList: 'autocomplete__item',
                    content: `${autoCompleteItem.name}, ${autoCompleteItem.country}`,
                    eventHandlers: [
                        {
                            type: 'click',
                            handler: this.clickToCity,
                        },
                    ],
                }));
            } else {
                return [
                    {
                        tag: 'div',
                        classList: 'autocomplete__item',
                        content: `City does't found`,
                    },
                ];
            }
        }
        return '';
    }
}
