import { body } from 'express-validator';

const validateBook = () => [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre").custom((value) => {
    if (!Array.isArray(value) || value.length === 0) {
      throw new Error("At least one genre must be selected.");
    }
    return true;
  }),
];

export { validateBook };
