import log from 'fancy-log';
import dotenv from 'dotenv';
import app from './app';
// import models from './server/database/models';

dotenv.config();
const { PORT } = process.env;

// models.sequelize.sync({ force: true }).then(() => {
//   log.info('Database Migrated');
// });
app.listen(PORT, () => log.info(`Server up and running on port ${PORT}`));
