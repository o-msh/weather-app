import Component from '../../Framework/Component';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
    }

    initHandlers() {
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const searchInput = document.querySelector('input');
        console.log('Wow! Me clicked!', this.host, searchInput.value);
    }

    render() {
        return [
            {
                tag: 'input',
                attributes: [
                    {
                        name: 'type',
                        value: 'text',
                    },
                    {
                        name: 'autocomplete',
                        value: 'off',
                    },
                ],
            },
            {
                tag: 'button',
                content: 'Search weather',
                eventHandlers: [
                    {
                        type: 'click',
                        handler: this.onClick,
                    },
                ],
            },
        ]
    }
}
