import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BookInstance } from './BookInstance';
import { Author } from './Author';
import { Genre } from './Genre';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  summary!: string;

  @Column()
  isbn!: string;

  @ManyToOne(() => Author, (author) => author.books)
  author!: Author;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres!: Genre[];

  @OneToMany(() => BookInstance, (bookInstance: BookInstance) => bookInstance.book)
  bookInstances!: BookInstance[];

  getUrl(): string {
    return `/books/${this.id}`;
  }

  constructor(bookData?: Partial<Book>) {
    this.title = bookData?.title ?? '';
    this.summary = bookData?.summary ?? '';
    this.isbn = bookData?.isbn ?? '';
  }
}
