import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope, getTransformedTime } from '../../utils';

import weatherForecast from '../../../../../weather-forecast.json';

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
        this.updateState({ weatherForecast: subState });
    }

    render() {
        // this.state.weatherForecast = weatherForecast;
        if (this.state.weatherForecast) {
            const { list: weatherForecast } = this.state.weatherForecast;
            return [
                {
                    tag: 'div',
                    classList: 'weather-forecast',
                    children: [
                        {
                            tag: 'div',
                            classList: 'weather-forecast__container',
                            children: [
                                {
                                    tag: 'div',
                                    classList: 'weather-forecast__title',
                                    content: `Weather Forecast:`,
                                },
                                {
                                    tag: 'div',
                                    classList: ['weather-forecast__list', 'forecast'],
                                    children: weatherForecast.map(weather => ({
                                        tag: 'div',
                                        classList: 'forecast__item',
                                        children: [
                                            {
                                                tag: 'div',
                                                classList: 'forecast-item__time',
                                                content: getTransformedTime(weather.dt),
                                            },
                                            {
                                                tag: 'div',
                                                content: weather.main.temp,
                                            },
                                        ],
                                    })),
                                },
                            ],
                        },
                    ],
                },
            ];
        } else {
            return [];
        }
    }
}
