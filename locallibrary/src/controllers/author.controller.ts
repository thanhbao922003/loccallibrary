import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllAuthorsWithBooks, countAuthors, getAuthorById, deleteAuthorById, createAuthor } from '../services/author.service';
import { validationResult } from 'express-validator';
import { validateAuthor } from '../validations/authorValidation';

// Hiển thị danh sách tất cả các Tác giả (List)
export const authorListGet = asyncHandler(async (req: Request, res: Response) => {
  const authors = await getAllAuthorsWithBooks();

  const authorsWithUrl = authors.map(author => ({
    ...author,
    url: author.getUrl(),
    booksCount: author.books.length,
    date_of_birth: author.date_of_birth ? new Date(author.date_of_birth) : null,
    date_of_death: author.date_of_death ? new Date(author.date_of_death) : null,
  }));

  const { author_count } = await countAuthors();

  res.render('authors/author', {
    authors: authorsWithUrl,
    title: req.i18n.t('author.author_list'),
    author_count 
  });
});

// Hiển thị chi tiết một Tác giả cụ thể (Show)
export const authorShowGet = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Mã tác giả không hợp lệ' }); 
    return; 
  }

  const author = await getAuthorById(id);

  if (!author) {
    res.status(404).json({ message: 'Tác giả không tìm thấy' }); 
    return;
  }

  const books = author.books || [];  

  res.render('authors/detail', {
    author,
    books,
    title: req.i18n.t('author.author_detail')
  });
});

// Hiển thị trang tạo tác giả mới (Create GET)
export const authorCreateGet = asyncHandler(async (req: Request, res: Response) => {
  res.render('authors/form', { 
    title: 'Create Author', 
    author: {},  
    errors: []   
  });
});

// Xử lý POST để tạo tác giả mới (Create POST)
export const authorCreatePost = [
  ...validateAuthor(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const author = {
      first_name: req.body.first_name || '',
      family_name: req.body.family_name || '',
      date_of_birth: req.body.date_of_birth || '',
      date_of_death: req.body.date_of_death ? req.body.date_of_death : null
    };

    if (!errors.isEmpty()) {
      return res.render('authors/form', {
        title: 'Create Author',
        author: author,  
        errors: errors.array(),
      });
    }

    const createdAuthor = await createAuthor(author);

    res.redirect(`/authors/${createdAuthor.id}`);
  })
];

// Hiển thị trang cập nhật tác giả (Update GET)
export const authorUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Hiển thị form cập nhật tác giả với id: ${req.params.id}` });
});

// Xử lý POST để cập nhật tác giả (Update POST)
export const authorUpdatePost = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: `Xử lý cập nhật tác giả với id: ${req.params.id}` });
});

// Hiển thị trang để xóa tác giả (Delete GET)
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    res.status(404).send('Invalid author ID parameter');
    return;
  }
  
  const author = await getAuthorById(id);
  
  if (author === null) {
    res.redirect('/authors'); 
    return;
  }

  // Lấy tất cả sách của tác giả
  const allBooksByAuthor = author.books;
  
  // Render trang xóa
  res.render('authors/delete', { 
    title: 'Delete Author', 
    author: author, 
    authorBooks: allBooksByAuthor 
  });
});

// POST phương thức để xử lý xóa tác giả
export const authorDeletePost = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.body.authorid); // Sử dụng ID từ body

  if (isNaN(id)) {
    res.status(404).send('Invalid author ID parameter');
    return;
  }

  const author = await getAuthorById(id);

  if (author === null) {
    res.redirect('/authors'); 
    return;
  }

  const allBooksByAuthor = author.books;

  if (allBooksByAuthor.length > 0) {
    res.render('authors/delete', {
      title: 'Delete Author',
      author: author,
      authorBooks: allBooksByAuthor,
    });
    return;
  } else {
    await deleteAuthorById(id);
    res.redirect('/authors');
  }
});
