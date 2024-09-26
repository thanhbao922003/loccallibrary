import { AppDataSource } from '../repos/db';
import { Genre } from '../entity/Genre';

const genreRepository = AppDataSource.getRepository(Genre);

export const countGenres = async () => {
  const numGenres = await genreRepository.count();
  return { genre_count: numGenres }; 
};
