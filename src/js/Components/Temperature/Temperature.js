import Component from '../../Framework/Component';

export default class Temperature extends Component {
    constructor(host, props) {
        super(host, props);
    }

    bindEverything() {
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log('Wow! Me clicked!', this.host);
    }

    render() {
        return [
            this.props.temperature + '&deg;' + this.props.unit,
            {
                tag: 'div',
                children: [
                    {
                        tag: 'div',
                        content: 'Child 2.1',
                    },
                    '<div>i am a grand children</div>',
                    {
                        tag: 'div',
                        content: 'Child 2.2',
                        children: [
                            {
                                tag: 'button',
                                content: 'Click Me!',
                                eventHandlers: {
                                    click: this.onClick,
                                },
                            },
                        ],
                    },
                ],
            },
        ]
    }
}
