import cors from 'cors';
import {Application} from 'express';


class CORS {
  public static init(app: Application): Application {
    console.log('Enabling CORS...');

    // const options = {
    //   origin: '*',
    //   optionsSuccessStatus: 200,

    // };

    app.use(cors());

    return app;
  }
}

export default CORS;
