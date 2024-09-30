import { AppDataSource } from '../repos/db';
import { Book } from '../entity/Book';

const bookRepository = AppDataSource.getRepository(Book);

export const countBooks = async () => {
  const numBooks = await bookRepository.count();
  return { book_count: numBooks }; 
};

export const getAllBooksWithAuthor = async () => {
  return await bookRepository.find({
    order: { title: 'ASC' },
    relations: ['author']
  });
};

export const getBookById = async (id: number) => {
  return await bookRepository.findOne({
      where: { id },
      relations: ['author', 'genres', 'bookInstances'],
  });
};
