import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";
import {AuthorDTO} from "../dto/author.dto";
import {authorService} from "../services/author.service";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Get("{id}")
  public async getBookById(id: number): Promise<BookDTO | null> {
      return bookService.getBookById(id);
  }

  @Post("/")
  public async createBook(@Body() requestBody: BookDTO): Promise<BookDTO> {
      return new Promise(async (resolve, reject) => {
          const { title, publish_year, author, isbn } = requestBody;

          if (!author || typeof author.id !== 'number') {
              const error = new Error('Author ID not found');
              (error as any).status = 400;
              return reject(error);
          }

          try {
              const createdBook = await bookService.createBook(title, publish_year, author.id, isbn);
              resolve(createdBook);
          } catch (error) {
              reject(error);
          }
      });
  }

  @Delete("{id}")
  public async deleteBook(id: number): Promise<void> {
      if (!id) {
          const error = new Error('ID not found');
          (error as any).status = 400;
          throw error;
      }
      await bookService.deleteBook(id);
  }

  @Patch("{id}")
  public async updateBook(@Body() requestBody: BookDTO, @Path() id: number): Promise<BookDTO | null> {
      const { title, publish_year, author, isbn } = requestBody;
      if (!author || typeof author.id !== 'number') {
          const error = new Error('Author is required');
          (error as any).status = 400;
          throw error;
      }
      return bookService.updateBook(id, title, publish_year, author?.id, isbn);
  }
}