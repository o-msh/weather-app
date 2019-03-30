import Component from '../../Framework/Component';
import SearchBar from '../SearchBar';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';
import SearchHistory from '../SearchHistory';
import FavouriteLocations from '../FavouriteLocations';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            SearchBar,
            CurrentWeather,
            WeatherForecast,
            SearchHistory,
            FavouriteLocations,
        ].map(component => {
            return {
                tag: component,
            }
        })
    }
}
