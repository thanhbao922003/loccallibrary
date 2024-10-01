import 'reflect-metadata';
import { AppDataSource } from './repos/db';  
import express from 'express';
import path from 'path';
import routes from './route/index.route';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    
    const host = 'localhost';
    const port = 3000;

    app.listen(port, host, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });

    app.set('views', path.join(__dirname, '../src/view'));
    app.set('view engine', 'pug');

    app.use('/stylesheet', express.static(path.join(__dirname, '/public/stylesheet')));
    
    app.use('/', routes);


  })
  .catch((error) => console.log('Error during Data Source initialization:', error));
