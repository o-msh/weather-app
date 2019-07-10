import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';
import '../../Services/WeatherDataService';

export default class AutoComplete extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('AUTOCOMPLETEINPUT', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself']);
        this.state = {};
    }

    updateMyself(subState) {
        console.log(subState);
    }

    render() {
        return this.state.autoCompleteList
            ? this.state.autoCompleteList.map(autoCompleteItem => ({
                  tag: 'div',
                  classList: ['autocomplete__item'],
                  content: autoCompleteItem.name,
              }))
            : '';
    }
}
