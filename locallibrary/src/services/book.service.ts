import { In } from 'typeorm';
import { AppDataSource } from '../repos/db';
import { Book } from '../entity/Book';
import { Author } from '../entity/Author';
import { Genre } from '../entity/Genre';

const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);
const genreRepository = AppDataSource.getRepository(Genre);

export const countBooks = async () => {
  const numBooks = await bookRepository.count();
  return { book_count: numBooks };
};

export const getAllBooksWithAuthor = async () => {
  return await bookRepository.find({
    order: { title: 'ASC' },
    relations: ['author'], 
  });
};

export const getBookById = async (id: number) => {
  return await bookRepository.findOne({
    where: { id },
    relations: ['author', 'genres', 'bookInstances'], // Liên kết với thể loại và bản sao sách
  });
};

export const findAuthorById = async (authorId: number): Promise<Author | null> => {
  return await authorRepository.findOne({ where: { id: authorId } });
};

export const createBook = async (bookData: any) => {
  const author = await findAuthorById(bookData.author);
  const book = new Book({
    title: bookData.title,
    summary: bookData.summary,
    isbn: bookData.isbn,
  });

  if (author) {
    book.author = author;
  }

  if (bookData.genres && bookData.genres.length > 0) {
    book.genres = await genreRepository.find({
      where: { id: In(bookData.genres) }
    });
  }

  return await bookRepository.save(book);
};


export const getAllAuthorsAndGenres = async () => {
  const [allAuthors, allGenres] = await Promise.all([
    authorRepository.find({}),
    genreRepository.find({}),
  ]);

  return { allAuthors, allGenres };
};

export const findBookByISBN = async (isbn: string) => {
  return await bookRepository.findOne({ where: { isbn } });
};

export const updateBookGenres = async (bookId: number, bookData: any) => {
  const book = await getBookById(bookId); 

  if (!book) {
    throw new Error('Book not found'); 
  }

  book.title = bookData.title;

  const author = await findAuthorById(bookData.author);
  if (author) {
    book.author = author; 
  }

  book.summary = bookData.summary;
  book.isbn = bookData.isbn;

  const genreIds: number[] = bookData.genre
    .map((item: string) => parseInt(item))
    .filter((id: number) => !isNaN(id)); 

  book.genres = await genreRepository.find({
    where: { id: In(genreIds) }
  });

  return await bookRepository.save(book);
};


