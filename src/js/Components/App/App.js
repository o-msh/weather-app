import Temperature from '../Temperature';

export default class App {
    constructor(host) {

        host.innerHTML = '';
        const temperature1 = document.createElement('div');
        new Temperature(temperature1);
        host.append(temperature1);
    }
}
