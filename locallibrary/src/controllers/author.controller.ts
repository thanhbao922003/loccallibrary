import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllAuthorsWithBooks, countAuthors, getAuthorById } from '../services/author.service';

// Hiển thị danh sách tất cả các Tác giả (List)
export const authorListGet = asyncHandler(async (req: Request, res: Response) => {
  const authors = await getAllAuthorsWithBooks();

  const authorsWithUrl = authors.map(author => ({
    ...author,
    url: author.getUrl(), 
    booksCount: author.books.length,
    date_of_birth: author.date_of_birth ? author.date_of_birth.toString() : 'N/A',
    date_of_death: author.date_of_death ? author.date_of_death.toString() : 'N/A',
  }));

  const { author_count } = await countAuthors();

  res.render('authors/author', {
    authors: authorsWithUrl,
    title: req.i18n.t('author.author_list'),
    author_count 
  });
});

// Hiển thị chi tiết một Tác giả cụ thể (Show)
export const authorShowGet = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Mã tác giả không hợp lệ' }); 
    return; 
  }

  const author = await getAuthorById(id);

  if (!author) {
    res.status(404).json({ message: 'Tác giả không tìm thấy' }); 
    return;
  }

  const books = author.books || [];  

  res.render('authors/detail', {
    author,
    books,
    title: req.i18n.t('author.author_detail')
  });
});

// Hiển thị trang tạo tác giả mới (Create GET)
export const authorCreateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Hiển thị form tạo tác giả mới' });
});

// Xử lý POST để tạo tác giả mới (Create POST)
export const authorCreatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Xử lý tạo tác giả mới' });
});

// Hiển thị trang cập nhật tác giả (Update GET)
export const authorUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form cập nhật tác giả với id: ${req.params.id}` });
});

// Xử lý POST để cập nhật tác giả (Update POST)
export const authorUpdatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý cập nhật tác giả với id: ${req.params.id}` });
});

// Hiển thị trang để xóa tác giả (Delete GET)
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form xác nhận xóa tác giả với id: ${req.params.id}` });
});

// Xử lý POST để xóa tác giả (Delete POST)
export const authorDeletePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý xóa tác giả với id: ${req.params.id}` });
});
