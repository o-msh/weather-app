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
                {
                    tag: 'ul',
                    children: currentWeather.weather.map(weather => ({
                        tag: 'li',
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
            ];
        }
        return [];
    }
}
