import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope, getTransformedTime } from '../../utils';
import temperatureIcon from '../../../img/temperature.svg';
import cloudsIcon from '../../../img/clouds.svg';

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
                                    children: weatherForecast.map((weather, index) => ({
                                        tag: 'div',
                                        classList: 'forecast__item',
                                        attributes: [
                                            {
                                                name: 'data-id',
                                                value: index,
                                            },
                                        ],
                                        eventHandlers: [
                                            {
                                                type: 'click',
                                                handler: this.onForecastClick,
                                            },
                                        ],
                                        children: [
                                            {
                                                tag: 'div',
                                                classList: 'forecast-item__time',
                                                content: getTransformedTime(weather.dt),
                                            },
                                            {
                                                tag: 'div',
                                                classList: 'forecast-item-container',
                                                children: [
                                                    {
                                                        tag: 'div',
                                                        classList: 'forecast-item__list',
                                                        attributes: [
                                                            {
                                                                name: 'title',
                                                                value: 'Temperature',
                                                            },
                                                        ],
                                                        children: [
                                                            {
                                                                tag: 'div',
                                                                children: [
                                                                    {
                                                                        tag: 'img',
                                                                        classList: 'weather-icon',
                                                                        attributes: [
                                                                            {
                                                                                name: 'src',
                                                                                value: temperatureIcon,
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                tag: 'div',
                                                                content: `${weather.main.temp.toFixed(1)} &#8451;`,
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        tag: 'div',
                                                        classList: 'forecast-item__list',
                                                        attributes: [
                                                            {
                                                                name: 'title',
                                                                value: 'Cloudiness',
                                                            },
                                                        ],
                                                        children: [
                                                            {
                                                                tag: 'div',
                                                                children: [
                                                                    {
                                                                        tag: 'img',
                                                                        classList: 'weather-icon',
                                                                        attributes: [
                                                                            {
                                                                                name: 'src',
                                                                                value: cloudsIcon,
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                tag: 'div',
                                                                content: `${weather.main.humidity} %`,
                                                            },
                                                        ],
                                                    },
                                                ],
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
