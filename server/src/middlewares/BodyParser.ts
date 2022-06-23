import {Application} from 'express';

import bodyParser from 'body-parser';

class BodyParser {
    public static add( app: Application): Application{
        app.use(bodyParser.json());

        app.use(bodyParser.urlencoded({extended: false}))
        return app;
    }
}

export default BodyParser;