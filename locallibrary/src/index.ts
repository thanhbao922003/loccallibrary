import 'reflect-metadata';
import { AppDataSource } from './repos/db';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));
