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
        console.log(subState);
    }

    render() {
        return '';
    }
}
