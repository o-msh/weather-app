import Component from '../../Framework/Component';
import SearchBar from '../SearchBar';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: SearchBar,
            },
            {
                tag: CurrentWeather,
            },
            // {
            //     tag: WeatherForecast,
            // },
        ]
    }
}
