import Component from '../../Framework/Component';
import SearchBar from '../SearchBar';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';
import SearchHistory from '../SearchHistory';
import FavouriteLocations from '../FavouriteLocations';

import Counter from '../Counter';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            Counter,
            // SearchBar,
            // CurrentWeather,
            // WeatherForecast,
            // SearchHistory,
            // FavouriteLocations,
        ].map(component => {
            if (component === Counter) {
                return {
                    tag: component,
                    props: {
                        value: 5,
                    },
                }    
            } else {
                return {
                    tag: component,
                }
            }
        })
    }
}
