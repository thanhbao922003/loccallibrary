import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllBookInstancesWithBooks, countBookInstances } from '../services/bookinstance.service';

// Hiển thị danh sách tất cả các Tình trạng sách (List)
export const bookInstanceListGet = asyncHandler(async (req: Request, res: Response) => {
  const bookInstances = await getAllBookInstancesWithBooks();

  const bookInstancesWithUrl = bookInstances.map(bookInstance => ({
    ...bookInstance,
    url: bookInstance.getUrl(),  
    imprint: bookInstance.imprint,  
    due_back: bookInstance.due_back ? bookInstance.due_back.toString() : 'N/A',
    status: bookInstance.status,
    bookTitle: bookInstance.book ? bookInstance.book.title : 'N/A', 
  }));
  const { book_instance_count } = await countBookInstances();
  res.render('bookinstance/bookinstance', { bookInstances: bookInstancesWithUrl, title: req.i18n.t('bookinstance.bookinstance_list'), book_instance_count });
});

// Hiển thị chi tiết một Tình trạng sách cụ thể (Show)
export const bookInstanceShowGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Chi tiết tình trạng sách với id: ${req.params.id}` });
});

// Hiển thị trang tạo Tình trạng sách mới (Create GET)
export const bookInstanceCreateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Hiển thị form tạo tình trạng sách mới' });
});

// Xử lý POST để tạo Tình trạng sách mới (Create POST)
export const bookInstanceCreatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Xử lý tạo tình trạng sách mới' });
});

// Hiển thị trang cập nhật Tình trạng sách (Update GET)
export const bookInstanceUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form cập nhật tình trạng sách với id: ${req.params.id}` });
});

// Xử lý POST để cập nhật Tình trạng sách (Update POST)
export const bookInstanceUpdatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý cập nhật tình trạng sách với id: ${req.params.id}` });
});

// Hiển thị trang để xóa Tình trạng sách (Delete GET)
export const bookInstanceDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form xác nhận xóa tình trạng sách với id: ${req.params.id}` });
});

// Xử lý POST để xóa Tình trạng sách (Delete POST)
export const bookInstanceDeletePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý xóa tình trạng sách với id: ${req.params.id}` });
});
