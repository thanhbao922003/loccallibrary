import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books!: Book[];

  constructor(genreData: Partial<Genre>) {
    this.name = genreData.name ?? '';
    this.books = genreData.books ?? [];
  }
}
