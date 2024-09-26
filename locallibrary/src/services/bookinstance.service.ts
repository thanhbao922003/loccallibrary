import { AppDataSource } from '../repos/db';
import { BookInstance } from '../entity/BookInstance';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const countBookInstances = async () => {
  const [numBookInstances, availableBookInstances] = await Promise.all([
    bookInstanceRepository.count(),
    bookInstanceRepository.count({ where: { status: 'Available' } })
  ]);
  return { 
    book_instance_count: numBookInstances, 
    book_instance_available_count: availableBookInstances 
  }; 
};

export const getAllBookInstancesWithBooks = async () => {
  const bookInstances = await bookInstanceRepository.find({
    relations: ['book'],
  });
  
  return bookInstances;
};
