import { Author } from "../models/author.model";

export class AuthorService {
  // Récupère tous les auteurs
  public async getAllAuthors(): Promise<Author[]> {
    return Author.findAll();
  }

  // Récupère un auteur par ID
  public async getAuthorById(id: number): Promise<Author> {
    const author = await authorService.getAuthorById(id);
    if(!author){
      const error = new Error('Author not found');
      (error as any).status = 404;
      throw error;
    }
    return author;
  }


  // Crée un nouvel auteur
  public async createAuthor(firstName: string, lastName: string): Promise<Author> {
    return Author.create({first_name: firstName, last_name: lastName });
  }

  // Supprime un auteur par ID
  public async deleteAuthor(id: number): Promise<void> {
    const author = await Author.findByPk(id);
    if (!author) {
      throw new Error("Author not found");
    }
    await author.destroy();
  }

  // Met à jour un auteur
  public async updateAuthor(
    id: number,
    firstName?: string,
    lastName?: string
  ): Promise<Author | null> {
    const author = await Author.findByPk(id);
    if (author) {
      if (firstName) author.first_name = firstName;
      if (lastName) author.last_name = lastName;
      await author.save();
      return author;
    }
    return null;
  }
}

export const authorService = new AuthorService();
