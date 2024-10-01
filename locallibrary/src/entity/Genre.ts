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
  
  getUrl(): string {
    return `/genres/${this.id}`;
  }
  
  constructor(genreData?: Partial<Genre>) {
    if (genreData) {
      if (genreData.name) {
        this.name = genreData.name;  
      }
    }
  }
}
