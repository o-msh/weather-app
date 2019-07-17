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
                {
                    tag: 'div',
                    classList: 'current-weather',
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
                                    content: `<i class="fas fa-thermometer-full"></i> ${currentWeather.main.temp.toFixed(
                                        1,
                                    )} &#8451;`,
                                },
                                {
                                    tag: 'div',
                                    attributes: [
                                        {
                                            name: 'title',
                                            value: 'humidity',
                                        },
                                    ],
                                    classList: 'main-list__item',
                                    content: `<i class="fas fa-water"></i> ${currentWeather.main.humidity} %`,
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
                                                value: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
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
            ];
        }
        return [];
    }
}
