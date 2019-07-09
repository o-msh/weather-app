import AppState from '../Services/AppState';
import { bindScope } from '../utils';

class WeatherDataService {
    constructor() {
        bindScope(this, ['getCurrentWeather', 'getWeatherForecast', 'fetchData']);
        this.url = 'https://api.openweathermap.org/data/2.5/';
        this.apiKey = '086514c4ba3c6c4f3a64d9bbd63d4849';
        AppState.watch('USERSEARCH', [this.getCurrentWeather, this.getWeatherForecast]);
    }

    async fetchData(state, props) {
        try {
            const response = await fetch(`${this.url}${props.type}?q=${state.city}&units=${props.unit || 'metric'}&appid=${this.apiKey}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            if (Number(responseData.cod) !== 200) {
                throw new Error(`Server error. Try later.`);
            }
            return responseData;
        } catch (error) {
            console.log('Catched error:', error.message);
        }
    }

    getCurrentWeather(state) {
        this.fetchData(state, { type: 'weather' })
            .then(response => AppState.update('CURRENTWEATHER', response));
    }

    getWeatherForecast(state) {
        this.fetchData(state, { type: 'forecast' })
            .then(response => AppState.update('WEATHERFORECAST', response));
    }
}

export default new WeatherDataService();
