import Component from '../../Framework/Component';
import SearchBar from '../SearchBar';
import CurrentWeather from '../CurrentWeather';
import WeatherForecast from '../WeatherForecast';
import SearchHistory from '../SearchHistory';
import FavouriteLocations from '../FavouriteLocations';

import CountControls from '../CountControls';
import PrettyNumber from '../PrettyNumber';
import Counter from '../Counter';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: CountControls,
            },
            {
                tag: PrettyNumber,
            },
            {
                tag: PrettyNumber,
            }
        ]
    }
}
