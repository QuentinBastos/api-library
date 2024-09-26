import { Author } from "../models/author.model";
import { Book } from "../models/book.model";

export class BookService {
    public async getAllBooks(): Promise<Book[]> {
        return Book.findAll({
            include: [{
                model: Author,
                as: 'author'
            }]
        });
    }

    public async getBookById(id: number): Promise<Book> {
        const book = await Book.findByPk(id, {
            include: [{
                model: Author,
                as: 'author'
            }]
        });
        return new Promise((resolve, reject) => {
            if (book) {
                resolve(book);
            } else {
                reject(book);
            }
        });
    }

    public async createBook(title: string, publishYear: number, authorId: number, isbn: string): Promise<Book> {
        return Book.create({title, publish_year: publishYear, author_id: authorId, isbn});
    }

    public async deleteBook(id: number): Promise<void> {
        const book = await Book.findByPk(id);
        if (!book) {

            throw new Error("Author not found");
        }
        await book.destroy();
    }

    public async updateBook(id: number, title?: string, publishYear?: number, authorId?: number, isbn?: string): Promise<Book | null> {
        const book = await Book.findByPk(id);
        if (book) {
            if (title) book.title = title;
            if (publishYear) book.publish_year = publishYear;
            if (authorId) book.author_id = authorId;
            if (isbn) book.isbn = isbn;
            await book.save();
            return book;
        }
        return null;
    }
}

export const bookService = new BookService();
