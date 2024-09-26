import { AppDataSource } from '../repos/db';
import { BookInstance } from '../entity/BookInstance';
import { StatusEnum } from '../enums/statusenums'; 

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const countBookInstances = async () => {
  const [numBookInstances, availableBookInstances] = await Promise.all([
    bookInstanceRepository.count(),
    bookInstanceRepository.count({ where: { status: StatusEnum.Available } }) 
  ]);
  return { 
    book_instance_count: numBookInstances, 
    book_instance_available_count: availableBookInstances 
  }; 
};
