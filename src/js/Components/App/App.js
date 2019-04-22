import Component from '../../Framework/Component';
import SearchBar from '../SearchBar';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: SearchBar,
            },
        ]
    }
}
