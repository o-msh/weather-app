import Component from '../../Framework/Component';
import AppState from '../../Services/AppState';
import { bindScope } from '../../utils';
import humidityIcon from '../../../img/humidity.svg';
import pressureIcon from '../../../img/pressure.svg';
import temperatureIcon from '../../../img/temperature.svg';
import cloudsIcon from '../../../img/clouds.svg';
import windIcon from '../../../img/wind.svg';

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
                {
                    tag: 'div',
                    classList: 'current-weather',
                    children: [
                        {
                            tag: 'div',
                            classList: 'current-weather__container',
                            children: [
                                {
                                    tag: 'div',
                                    classList: 'current-weather__title',
                                    content: 'Current Weather:',
                                },
                                {
                                    tag: 'div',
                                    classList: 'current-weather__block',
                                    children: [
                                        {
                                            tag: 'div',
                                            classList: ['current-weather__main-list', 'main-list'],
                                            children: [
                                                {
                                                    tag: 'div',
                                                    attributes: [
                                                        {
                                                            name: 'title',
                                                            value: 'Temperature',
                                                        },
                                                    ],
                                                    classList: 'main-list__item',
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
                                                            content: `${currentWeather.main.temp.toFixed(1)} &#8451;`,
                                                        },
                                                    ],
                                                },
                                                {
                                                    tag: 'div',
                                                    attributes: [
                                                        {
                                                            name: 'title',
                                                            value: 'Humidity',
                                                        },
                                                    ],
                                                    classList: 'main-list__item',
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
                                                                            value: humidityIcon,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            tag: 'div',
                                                            content: `${currentWeather.main.humidity} %`,
                                                        },
                                                    ],
                                                },
                                                {
                                                    tag: 'div',
                                                    attributes: [
                                                        {
                                                            name: 'title',
                                                            value: 'Atmosphere pressure',
                                                        },
                                                    ],
                                                    classList: 'main-list__item',
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
                                                                            value: pressureIcon,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            tag: 'div',
                                                            content: `${currentWeather.main.pressure} hPa`,
                                                        },
                                                    ],
                                                },
                                                {
                                                    tag: 'div',
                                                    attributes: [
                                                        {
                                                            name: 'title',
                                                            value: 'Cloudiness',
                                                        },
                                                    ],
                                                    classList: 'main-list__item',
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
                                                            content: `${currentWeather.clouds.all} %`,
                                                        },
                                                    ],
                                                },
                                                {
                                                    tag: 'div',
                                                    attributes: [
                                                        {
                                                            name: 'title',
                                                            value: 'Speed of wind',
                                                        },
                                                    ],
                                                    classList: 'main-list__item',
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
                                                                            value: windIcon,
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            tag: 'div',
                                                            content: `${currentWeather.wind.speed} m/s`,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            tag: 'div',
                                            classList: 'current-weather__weather-list',
                                            children: currentWeather.weather.map(weather => ({
                                                tag: 'div',
                                                classList: 'current-weather__weather-item',
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
                        },
                    ],
                },
            ];
        }
        return [];
    }
}
