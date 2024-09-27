import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { countBooks } from '../services/book.service';
import { countAuthors } from '../services/author.service';
import { countGenres } from '../services/genre.service';
import { countBookInstances } from '../services/bookinstance.service';

export const index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [bookData, authorData, genreData, bookInstanceData] = await Promise.all([
        countBooks(),
        countAuthors(),
        countGenres(),
        countBookInstances()
      ]);

      res.render('index', {
        title: 'Sun Asterisk',
        book_count: bookData.book_count,
        author_count: authorData.author_count,
        genre_count: genreData.genre_count,
        book_instance_count: bookInstanceData.book_instance_count,
        book_instance_available_count: bookInstanceData.book_instance_available_count
      });
    } catch (error) {
      next(error);
    }
  }
);
