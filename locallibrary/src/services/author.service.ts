import { AppDataSource } from '../repos/db';
import { Author } from '../entity/Author';

const authorRepository = AppDataSource.getRepository(Author);

export const countAuthors = async () => {
  const numAuthors = await authorRepository.count();
  return { author_count: numAuthors };
};
