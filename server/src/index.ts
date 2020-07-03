import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import connect from './connect';
import { join as pathJoin } from 'path';
const app: Application = express();
const port = 8080;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const cors = require('cors');

app.use(cors());

app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
import routes from './routes';

app.use(express.static(pathJoin(__dirname, '../../client')));

app.listen(port, () => console.log(`Application started successfully on port ${port}.`));
const db = 'mongodb://localhost:27017/test';
connect({ db });
routes({ app });
