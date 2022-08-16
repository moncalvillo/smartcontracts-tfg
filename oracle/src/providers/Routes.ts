import {Application} from 'express';

import config from './Configuration';
import Router from '../routes/OracleRouter';

class Rutas { 
    public addRoutes(app: Application): Application{
        return app.use(`${config.apiPrefix}`, Router);
    }
}

export default new Rutas();