import Server from './Server';

class App {
    public init(): void {
        console.log('Server starting...');

        Server.init();
    }
}

export default new App();