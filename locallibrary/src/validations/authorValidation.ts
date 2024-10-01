import { body } from 'express-validator';

const validateAuthor = () => [
  body('first_name', 'First name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('family_name', 'Family name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
];

export { validateAuthor };
