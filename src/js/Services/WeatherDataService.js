import AppState from '../Services/AppState';
import { bindScope } from '../utils';

class WeatherDataService {
    constructor() {
        bindScope(this, ['getCurrentWeather', 'getWeatherForecast', 'fetchData', 'getCities']);
        this.apiConfigs = {
            weather: {
                url: 'https://api.openweathermap.org/data/2.5/',
                apiKey: '086514c4ba3c6c4f3a64d9bbd63d4849',
            },
            cities: {
                url: 'https://peaceful-oasis-27039.herokuapp.com/api/getCity?name=',
            },
        };
        AppState.watch('USERSEARCH', [this.getCurrentWeather, this.getWeatherForecast]);
        AppState.watch('AUTOCOMPLETESEARCH', this.getCities);
    }

    async fetchData(props) {
        try {
            AppState.update('ERROR', { error: '' });
            const response = await fetch(props.url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            AppState.update('ERROR', { error });
        }
    }

    getCurrentWeather(state) {
        this.fetchData({
            url: `${this.apiConfigs.weather.url}weather?q=${state.city}&units=${state.unit || 'metric'}&appid=${
                this.apiConfigs.weather.apiKey
            }`,
        }).then(response => AppState.update('CURRENTWEATHER', response));
    }

    getWeatherForecast(state) {
        this.fetchData({
            url: `${this.apiConfigs.weather.url}forecast?q=${state.city}&units=${state.unit || 'metric'}&appid=${
                this.apiConfigs.weather.apiKey
            }`,
        }).then(response => AppState.update('WEATHERFORECAST', response));
    }

    getCities(city) {
        if (city.length > 2) {
            AppState.update('LOADERSPINNERTOGGLE', {
                showLoader: true,
            });
            this.fetchData({
                url: `${this.apiConfigs.cities.url}${city}`,
            }).then(response => {
                AppState.update('LOADERSPINNERTOGGLE', {
                    showLoader: false,
                });
                AppState.update('AUTOCOMPLETELIST', response ? response : []);
            });
        } else {
            AppState.update('AUTOCOMPLETELIST', []);
        }
    }
}

export default new WeatherDataService();
