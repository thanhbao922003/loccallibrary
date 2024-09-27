import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllBooksWithAuthor, countBooks } from '../services/book.service';

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
  res.json({ message: `Chi tiết sách với id: ${req.params.id}` });
});

// Hiển thị trang tạo Sách mới (Create GET)
export const bookCreateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Hiển thị form tạo sách mới' });
});

// Xử lý POST để tạo Sách mới (Create POST)
export const bookCreatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Xử lý tạo sách mới' });
});

// Hiển thị trang cập nhật Sách (Update GET)
export const bookUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form cập nhật sách với id: ${req.params.id}` });
});

// Xử lý POST để cập nhật Sách (Update POST)
export const bookUpdatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý cập nhật sách với id: ${req.params.id}` });
});

// Hiển thị trang để xóa Sách (Delete GET)
export const bookDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form xác nhận xóa sách với id: ${req.params.id}` });
});

// Xử lý POST để xóa Sách (Delete POST)
export const bookDeletePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý xóa sách với id: ${req.params.id}` });
});

