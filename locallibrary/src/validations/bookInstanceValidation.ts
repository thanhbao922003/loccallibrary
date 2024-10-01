import { body } from 'express-validator';

const validateBookInstance = () => [
    body("book", "Book must be selected.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("imprint", "Imprint must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").optional({ checkFalsy: true }).escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
];

export { validateBookInstance };
