import { AppDataSource } from '../repos/db';
import { Author } from '../entity/Author';

const authorRepository = AppDataSource.getRepository(Author);

export const countAuthors = async () => {
  const numAuthors = await authorRepository.count();
  return { author_count: numAuthors }; 
};

export const getAllAuthorsWithBooks = async () => {
  return await authorRepository.find({
    relations: ['books'],
  });
};

export const getAuthorById = async (id: number) => {
  return await authorRepository.findOne({
    where: { id },
    relations: ['books'],  
  });
};