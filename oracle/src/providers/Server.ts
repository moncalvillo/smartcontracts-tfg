import express, {Application} from 'express';
import BodyParser from '../middlewares/BodyParser';
import CORS from '../middlewares/CORS';
import config from './Configuration';
import Routes from './Routes';
import "reflect-metadata";

class Server {

    public app: Application;

    constructor(){
        this.app = express();
    }

    private async initMiddlewares(): Promise<void>{
        BodyParser.add(this.app);
        CORS.init(this.app);
    }

    public async init(): Promise<void>{

        
        this.initMiddlewares();
        Routes.addRoutes(this.app);
        
        const port = config.port;
        this.app.listen(port, () => {
            console.log(`Server listening to port ${port}`);
        });
    }
}

export default new Server();