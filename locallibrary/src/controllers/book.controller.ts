import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllBooksWithAuthor, countBooks, getBookById, getAllAuthorsAndGenres, updateBookGenres, createBook   } from '../services/book.service';
import { BookInstanceStatus } from '../enums/statusenums';
import { validationResult } from 'express-validator';
import { validateBook } from '../validations/bookValidation';
import { validateBookUpdate } from '@src/validations/bookUpdateValidate';

// Hiển thị danh sách tất cả các Sách (List)
export const bookListGet = asyncHandler(async (req: Request, res: Response) => {
  const books = await getAllBooksWithAuthor();

  const booksWithUrl = books.map(book => ({
    ...book,
    url: book.getUrl(),  
  }));

  const { book_count } = await countBooks();

  res.render('books/book', { books: booksWithUrl, title: req.i18n.t('book.book_list'), book_count  });

});

// Hiển thị chi tiết một Sách cụ thể (Show)
export const bookShowGet = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
      res.status(400).json({ message: 'Mã sách không hợp lệ' }); 
      return; 
  }

  const book = await getBookById(id);
  console.log(book);
  if (!book) {
      res.status(404).json({ message: 'Sách không tìm thấy' }); 
      return;
  }

  const bookInstances = book.bookInstances || []; 
  const bookGenres = book.genres || []; 

  res.render('books/detail', {
      book,
      bookInstances,
      bookGenres,
      title: req.i18n.t('book.book_detail'),
      BookInstanceStatus
  });
});

// Hiển thị trang tạo Sách mới (Create GET)
export const bookCreateGet = asyncHandler(async (req: Request, res: Response) => {
  const { allAuthors, allGenres } = await getAllAuthorsAndGenres();

  res.render('books/form', { 
      title: 'Create Book',
      authors: allAuthors,
      genres: allGenres,
      book: {},
      errors: [] 
  });
});

// Xử lý POST để tạo Sách mới (Create POST)
export const bookCreatePost = [
  ...validateBook(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
  
    const { allAuthors, allGenres } = await getAllAuthorsAndGenres();
  
    const book = {
      title: req.body.title || '',
      author: req.body.author || '',
      summary: req.body.summary || '',
      isbn: req.body.isbn || '',
      genre: Array.isArray(req.body.genre) ? req.body.genre : []  // Xử lý trường hợp undefined
    };
  
    if (!errors.isEmpty()) {
      return res.render('books/create', {
        title: "Create new book",
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });
    }
  
    const genreIds = book.genre.map((item: string) => parseInt(item, 10)); // Sử dụng book.genre đã xử lý
    const bookData = {
      title: book.title,
      author: book.author, 
      summary: book.summary,
      isbn: book.isbn,
      genres: genreIds 
    };
  
    const createdBook = await createBook(bookData);
    res.redirect(`/books/${createdBook.id}`);
  })
  
];

// Hiển thị trang cập nhật Sách (Update GET)
export const bookUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  
  if (!book) {
    const err = new Error('Book not found');
    return next(err);
  }
  
  const { allAuthors, allGenres } = await getAllAuthorsAndGenres();
  
  res.render('books/update', { title: 'Update Book', authors: allAuthors, genres: allGenres, book: book });
});

// Xử lý POST để cập nhật Sách (Update POST)
export const bookUpdatePost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    }
    next();
  },

  ...validateBookUpdate(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { allAuthors, allGenres } = await getAllAuthorsAndGenres();
      return res.render('books/update', {
        title: 'Update Book',
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array(),
      });
    }

    const updatedBook = await updateBookGenres(id, req.body);

    res.redirect(updatedBook.getUrl());
  }),
];

// Hiển thị trang để xóa Sách (Delete GET)
export const bookDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form xác nhận xóa sách với id: ${req.params.id}` });
});

// Xử lý POST để xóa Sách (Delete POST)
export const bookDeletePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý xóa sách với id: ${req.params.id}` });
});

