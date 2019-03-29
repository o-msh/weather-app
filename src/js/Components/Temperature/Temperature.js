import Component from '../../Framework/Component';

export default class Temperature extends Component {
    constructor(host, props) {
        super(host, props);
    }

    initHandlers() {
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log('Wow! Me clicked!', this.host);
    }

    render() {
        return [
            this.props.temperature + '&deg;' + this.props.unit,
            '<h3>this is header</h3>',
            'this is a text node',
            {
                tag: 'div',
                children: [
                    {
                        tag: 'div',
                        content: 'Child 2.1',
                    },
                    '<strong>i am a grand children</strong>',
                    {
                        tag: 'div',
                        content: 'Child 2.2',
                        children: [
                            {
                                tag: 'div',
                                children: [
                                    {
                                        tag: 'button',
                                        content: 'Click Me!',
                                        eventHandlers: [
                                            {
                                                type: 'click',
                                                handler: this.onClick,
                                            },
                                        ],
                                    }
                                ]
                            },
                        ],
                    },
                ],
            },
        ]
    }
}
