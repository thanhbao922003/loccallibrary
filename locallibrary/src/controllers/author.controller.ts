import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// Hiển thị danh sách tất cả các tác giả (List)
export const authorListGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Danh sách tất cả các tác giả' });
});

// Hiển thị chi tiết một tác giả cụ thể (Show)
export const authorShowGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Chi tiết tác giả với id: ${req.params.id}` });
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
