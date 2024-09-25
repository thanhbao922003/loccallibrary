import { AppDataSource } from '../repos/db';
import { Book } from '../entity/Book';

const bookRepository = AppDataSource.getRepository(Book);

export const countBooks = async () => {
  const numBooks = await bookRepository.count();
  return { book_count: numBooks }; 
};
