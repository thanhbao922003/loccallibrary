import express from "express";
import * as bookInstanceController from '../controllers/bookinstance.controller';

const router = express.Router();

router.get('/create', bookInstanceController.bookInstanceCreateGet);
router.post('/create', bookInstanceController.bookInstanceCreatePost);

router.get('/:id/update', bookInstanceController.bookInstanceUpdateGet);
router.post('/:id/update', bookInstanceController.bookInstanceUpdatePost);

router.get('/:id/delete', bookInstanceController.bookInstanceDeleteGet);
router.post('/:id/delete', bookInstanceController.bookInstanceDeletePost);

router.get('/:id', bookInstanceController.bookInstanceShowGet);

router.get('/', bookInstanceController.bookInstanceListGet);

export default router;
