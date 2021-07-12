import 'dotenv/config';
import appConfig from 'config/app';
import { app } from './app';

app.listen(appConfig.port, () => console.log(`Server is running on port ${appConfig.port} in ${appConfig.env} mode!`));