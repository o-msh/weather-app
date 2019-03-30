import Component from '../../Framework/Component';
import WeatherDataService from '../../Services/WeatherDataService';
import WeatherForecastItem from '../WeatherForecastItem/';

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [
            {
                tag: 'div',
                content: 'I am a WeatherForecast component, and i have a children',
                children: [1, 2, 3, 4, 5].map(() => {
                    return {
                        tag: WeatherForecastItem
                    }
                }),
            },
        ]
    }
}
