import log from 'fancy-log';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const { PORT } = process.env;

app.listen(PORT, () => log.info(`Server up and running on port ${PORT}`));
