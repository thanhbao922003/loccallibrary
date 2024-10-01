import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllGenres, countGenres, getGenreById, saveGenre, findGenreByName  } from '@src/services/genre.service';
import { validationResult } from 'express-validator';
import { Genre } from '@src/entity/Genre'; 
import { validateGenre } from '../validations/genreValidate';


// Hiển thị danh sách tất cả các Thể loại sách (List)
export const genreListGet = asyncHandler(async (req: Request, res: Response) => {
    const genres = await getAllGenres();

    const genresWithUrl = genres.map(genre => ({
      ...genre,
      url: genre.getUrl(),  
    }));

  const { genre_count } = await countGenres();
    res.render('genres/genre', { genres: genresWithUrl, title: req.i18n.t('genre.genre_list'), genre_count });
});

// Hiển thị chi tiết một Thể loại sách cụ thể (Show)
export const genreShowGet = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Mã thể loại không hợp lệ' }); 
    return; 
  }

  const genre = await getGenreById(id);

  if (!genre) {
    res.status(404).json({ message: 'Thể loại không tìm thấy' }); 
    return;
  }

  const books = genre.books || [];  

  res.render('genres/detail', {
    genre,
    books,
    title: req.i18n.t('genre.genre_detail')
  });
});

// Hiển thị trang tạo Thể loại sách mới (Create GET)
export const genreCreateGet = asyncHandler(async (req: Request, res: Response) => {
  res.render('genres/form', { title: 'Create Genre' });
});

// Xử lý POST để tạo Thể loại sách mới (Create POST)
export const genreCreatePost = [
  ...validateGenre(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const genre = new Genre({
      name: req.body.name 
    });


    if (!errors.isEmpty()) {
      res.render('genres/form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      });
      return;
    }

    const genreExists = await findGenreByName(req.body.name);
    if (genreExists) {
      res.redirect(genreExists.getUrl());
    } else {
      const savedGenre = await saveGenre(genre);
      res.redirect(savedGenre.getUrl());
    }
  }),
];

// Hiển thị trang cập nhật Thể loại sách (Update GET)
export const genreUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form cập nhật thể loại sách với id: ${req.params.id}` });
});

// Xử lý POST để cập nhật Thể loại sách (Update POST)
export const genreUpdatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý cập nhật thể loại sách với id: ${req.params.id}` });
});

// Hiển thị trang để xóa Thể loại sách (Delete GET)
export const genreDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form xác nhận xóa thể loại sách với id: ${req.params.id}` });
});

// Xử lý POST để xóa Thể loại sách (Delete POST)
export const genreDeletePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý xóa thể loại sách với id: ${req.params.id}` });
});
