import Component from '../../Framework/Component';
import Temperature from '../Temperature';
import Wind from '../Wind';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        const t1 = document.createElement('div');
        new Temperature(t1, { temperature: 25, unit: 'C' });
        const w1 = document.createElement('div');
        new Wind(w1, { speed: 100500, unit: 'mph' });
        return [
            'Temperature range',
            t1,
            w1,
            {
                tag: Wind,
                props: {
                    speed: 250,
                    unit: 'mph',
                },
            },
            {
                tag: Temperature,
                props: {
                    temperature: 7,
                    unit: 'C',
                },
            },
            {
                tag: Temperature,
                props: {
                    temperature: 18,
                    unit: 'C',
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
                attributes: [
                    {
                        name: 'title',
                        value: 'I have got children',
                    },
                ],
                children: [
                    {
                        tag: 'div',
                        content: 'Child 1',
                    },
                    {
                        tag: 'div',
                        content: 'Child 2',
                        children: [
                            {
                                tag: 'div',
                                content: 'Child 2.1',
                            },
                            {
                                tag: 'div',
                                content: 'Child 2.2',
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
