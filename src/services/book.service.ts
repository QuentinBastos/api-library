import { BookDTO } from "../dto/book.dto";
import { notFound } from "../error/NotFoundError";
import { Author } from "../models/author.model";
import { Book } from "../models/book.model";

export class BookService {
  readonly includeAuthor = {
    include: [
      {
        model: Author,
        as: "author",
      },
    ],
  };

  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll(this.includeAuthor);
  }

  public async getBookById(id: number): Promise<BookDTO> {
    let book = await Book.findByPk(id, this.includeAuthor);

    if (book) {
      return book;
    } else {
      notFound("Book");
    }
  }

  public async createBook(
    title: string,
    publishYear: number,
    authorId: number,
    isbn: string,
  ): Promise<BookDTO> {
    let book = await Book.create({
      title: title,
      publish_year: publishYear,
      isbn: isbn,
      author_id: authorId,
    });

    return book;
  }
}

export const bookService = new BookService();
