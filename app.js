import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import modules from './server/modules';
import notFound from './server/modules/notFound';

const app = express();
app.use(cors('*'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

modules(app);
app.use(notFound);

export default app;
