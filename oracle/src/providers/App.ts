import Server from './Server';

class App {
    public init(): void {
        console.log('Oracle starting...');

        Server.init();
    }
}

export default new App();