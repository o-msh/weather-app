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
        return this.state.autoCompleteList
            ? this.state.autoCompleteList.map(autoCompleteItem => ({
                  tag: 'div',
                  classList: ['autocomplete__item'],
                  content: autoCompleteItem.name,
                  eventHandlers: [
                      {
                          type: 'click',
                          handler: this.clickToCity,
                      },
                  ],
              }))
            : '';
    }
}
