import Component from '../../Framework/Component';
import Temperature from '../Temperature';
import Wind from '../Wind';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: Temperature,
                props: {
                    temperature: 7,
                    unit: 'C',
                },
            },
            {
                tag: Wind,
                props: {
                    speed: 250,
                    unit: 'mph',
                },
            },
            {
                tag: 'div',
                content: 'Me div',
                classList: ['nice'],
                attributes: [
                    {
                        name: 'title',
                        value: 'Me definetely nice div',
                    },
                ],
            },
            {
                tag: 'div',
                content: 'Simple div with content',
            },
        ];
    }
}
