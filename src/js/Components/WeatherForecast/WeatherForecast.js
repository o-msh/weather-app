import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('WEATHERFORECAST', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself']);
        this.state = {};
    }

    updateMyself(subState) {
        this.updateState({ 'weatherForecast': subState });
    }

    render() {
        if (this.state.weatherForecast) {
            const { weatherForecast } = this.state;
            return [];
        } else {
            return [];
        }
    }
}
