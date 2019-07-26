import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope, getTransformedTime, getTransformedDate } from '../../utils';
import temperatureIcon from '../../../img/temperature.svg';
import cloudsIcon from '../../../img/clouds.svg';

import weatherForecast from '../../../../../weather-forecast.json';

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('WEATHERFORECAST', this.updateMyself);
    }

    init() {
        bindScope(this, ['updateMyself', 'onForecastClick']);
        this.state = {};
    }

    updateMyself(subState) {
        this.updateState({ weatherForecast: subState });
    }

    onForecastClick({ target }) {
        const forecastId = target.closest('.forecast__item').dataset.id;
        AppState.update('CURRENTWEATHER', this.state.weatherForecast.list[forecastId]);
    }

    render() {
        this.state.weatherForecast = weatherForecast;
        if (this.state.weatherForecast) {
            const tmpWeather = this.state.weatherForecast.list.reduce((acc, cur, i) => {
                if (!Array.isArray(acc[getTransformedDate(cur.dt)])) {
                    acc[getTransformedDate(cur.dt)] = [];
                }
                acc[getTransformedDate(cur.dt)].push(cur);
                return acc;
            }, {});
            const { list: weatherForecast } = this.state.weatherForecast;
            console.log(tmpWeather);
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
