import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope, getTransformedTime, getTransformedDate } from '../../utils';
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
            const changedForecast = this.state.weatherForecast.list.reduce((acc, cur, i) => {
                if (!Array.isArray(acc[getTransformedDate(cur.dt)])) {
                    acc[getTransformedDate(cur.dt)] = [];
                }
                cur.mainIndex = i;
                acc[getTransformedDate(cur.dt)].push(cur);
                return acc;
            }, {});
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
                                    children: Object.keys(changedForecast).map(key => ({
                                        tag: 'div',
                                        classList: 'forecast-group',
                                        content: `<div class='forecast__date'>${key}</div>`,
                                        children: changedForecast[key].map(item => ({
                                            tag: 'div',
                                            classList: 'forecast__item',
                                            attributes: [
                                                {
                                                    name: 'data-id',
                                                    value: item.mainIndex,
                                                },
                                                {
                                                    name: 'title',
                                                    value: 'Click to show more details',
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
                                                    content: getTransformedTime(item.dt),
                                                },
                                                {
                                                    tag: 'div',
                                                    classList: 'forecast-item-container',
                                                    children: [
                                                        {
                                                            tag: 'div',
                                                            classList: 'forecast-item__list',
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
                                                                    content: `${item.main.temp.toFixed(1)} &#8451;`,
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            tag: 'div',
                                                            classList: 'forecast-item__list',
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
                                                                    content: `${item.clouds.all} %`,
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            tag: 'div',
                                                            children: item.weather.map(weather => ({
                                                                tag: 'div',
                                                                children: [
                                                                    {
                                                                        tag: 'div',
                                                                        children: [
                                                                            {
                                                                                tag: 'img',
                                                                                attributes: [
                                                                                    {
                                                                                        name: 'src',
                                                                                        value: `http://openweathermap.org/img/wn/${
                                                                                            weather.icon
                                                                                        }@2x.png`,
                                                                                    },
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        tag: 'div',
                                                                        content: weather.description,
                                                                    },
                                                                ],
                                                            })),
                                                        },
                                                    ],
                                                },
                                            ],
                                        })),
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
