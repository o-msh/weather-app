import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';
import WeatherDataService from '../../Services/WeatherDataService';

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('USERSEARCH', this.updateMyself);
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
            this.state.city ? `Weather for ${this.state.city}` : 'I am a current weather component',
        ]
    }
}
