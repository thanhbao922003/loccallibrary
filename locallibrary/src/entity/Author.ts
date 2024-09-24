import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  first_name!: string;

  @Column()
  family_name!: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date; 

  @Column({ type: 'date', nullable: true })
  date_of_death?: Date;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];

  constructor(authorData: Partial<Author>) {
    this.first_name = authorData.first_name ?? '';
    this.family_name = authorData.family_name ?? '';
    this.date_of_birth = authorData.date_of_birth ?? new Date();
    this.date_of_death = authorData.date_of_death ?? undefined; 
    this.books = authorData.books ?? [];
  }
  
}
