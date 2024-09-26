import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './Book';

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imprint!: string;

  @Column()
  status!: string;

  @Column({ type: 'date', nullable: true })
  due_back?: Date;

  @ManyToOne(() => Book, (book) => book.bookInstances)  
  book?: Book;

  constructor(bookInstanceData?: Partial<BookInstance>) {
    this.imprint = bookInstanceData?.imprint ?? '';
    this.status = bookInstanceData?.status ?? '';
    this.due_back = bookInstanceData?.due_back ?? undefined;
    this.book = bookInstanceData?.book ?? undefined; 
  }
  
}
