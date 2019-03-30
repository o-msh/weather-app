import Component from '../../Framework/Component';

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return [
            'I am a current weather component',
        ]
    }
}
