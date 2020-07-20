import express from 'express';
import bodyParser from 'body-parser';

import modules from './server/modules';
import notFound from './server/modules/notFound';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

modules(app);
app.use(notFound);

export default app;
