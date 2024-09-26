import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Book } from '../entity/Book';
import { Author } from '../entity/Author';
import { Genre } from '../entity/Genre';
import { BookInstance } from '../entity/BookInstance';

config(); 

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Book, Author, Genre, BookInstance],
  migrations: ['src/migration/*.ts'],
});
