import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { AppDataSource } from './repos/db';
import routes from './route/index.route';

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    
    app.listen(3000, () => {  
      const host = 'localhost';
      const port = 3000;
      console.log(`Server is running at http://${host}:${port}`);
    });
  })
  .catch((error) => console.log('Error during Data Source initialization:', error));

app.set('views', path.join(__dirname, '../src/view'));
app.set('view engine', 'pug');

app.use('/stylesheet', express.static(path.join(__dirname, 'public/stylesheet')));

app.use('/', routes);
