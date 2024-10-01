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

export const deleteAuthorById = async (id: number): Promise<void> => {
  await authorRepository.delete(id);
};
export const createAuthor = async (authorData: Partial<Author>) => {
  const newAuthor = authorRepository.create(authorData); // Tạo đối tượng Author từ dữ liệu đầu vào
  return await authorRepository.save(newAuthor); // Lưu vào cơ sở dữ liệu
};