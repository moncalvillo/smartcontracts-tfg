import cors from 'cors';
import {Application} from 'express';


class CORS {
  public static init(app: Application): Application {
    console.log('Enabling CORS...');

    const options = {
      origin: ['http://localhost:3000', 'https://localhost:3000'],
      optionsSuccessStatus: 200,
    };

    app.use(cors(options));

    return app;
  }
}

export default CORS;
