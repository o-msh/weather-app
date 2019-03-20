import Component from '../../Framework/Component';

export default class Wind extends Component {
    constructor(host, props) {
        super(host, props);
    }
    
    render() {
        return [this.props.speed + ' ' + this.props.unit];
    }
}
