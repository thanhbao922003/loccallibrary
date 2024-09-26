import { Router } from 'express';
import authorRoute from './author.route';
import bookRoute from './book.route';
import bookInstanceRoute from './bookinstance.route'; 
import genreRoute from './genre.route';

const router = Router();

router.use('/authors', authorRoute);
router.use('/books', bookRoute);
router.use('/bookinstances', bookInstanceRoute); 
router.use('/genres', genreRoute);

export default router;
