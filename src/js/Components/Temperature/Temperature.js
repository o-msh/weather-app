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
                tag: 'button',
                content: 'Click me!',
                eventHandlers: {
                    click: this.onClick,
                },
            },
        ]
    }
}
