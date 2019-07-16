import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('CURRENTWEATHER', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself']);
        this.state = {};
    }

    updateMyself(subState) {
        this.updateState({ currentWeather: subState });
    }

    render() {
        if (this.state.currentWeather) {
            const { currentWeather } = this.state;
            return [
                `${currentWeather.name}, ${currentWeather.sys.country}`,
                `<div>${currentWeather.main.temp.toFixed(1)} &#8451;</div>`,
            ];
        }
        return [];
    }
}
