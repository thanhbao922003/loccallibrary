import { Router } from 'express';
import authorRoute from './author.route';
import bookRoute from './book.route';
import bookInstanceRoute from './bookinstance.route'; 
import genreRoute from './genre.route';
import { index } from '../controllers/index.controller';
import i18next from '../ie18n';
import setLocaleMiddleware  from '../middleware/setLocaleMiddleWare'; 
import i18nextMiddleware from "i18next-http-middleware";

const router = Router();
router.use(i18nextMiddleware.handle(i18next)); 
router.use(setLocaleMiddleware);

router.get('/', index)
router.use('/authors', authorRoute);
router.use('/books', bookRoute);
router.use('/bookinstances', bookInstanceRoute); 
router.use('/genres', genreRoute);

export default router;
