import { body } from 'express-validator';

const validateGenre = () => [
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
];

export { validateGenre };
