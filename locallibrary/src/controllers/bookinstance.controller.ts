import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// Hiển thị danh sách tất cả các Tình trạng sách (List)
export const bookInstanceListGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Danh sách tất cả tình trạng sách' });
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
