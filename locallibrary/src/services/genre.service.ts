import { AppDataSource } from '../repos/db';
import { Genre } from '../entity/Genre';

const genreRepository = AppDataSource.getRepository(Genre);

export const countGenres = async () => {
  const numGenres = await genreRepository.count();
  return { genre_count: numGenres }; 
};

export const getAllGenres = async () => {
  return await genreRepository.find({
    order: { name: 'ASC' },
  });
};

export const getGenreById = async (id: number) => {
  return await genreRepository.findOne({
      where: { id },
      relations: ['books'],  
  });
};