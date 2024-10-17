export type Role = 'admin' | 'gerant' | 'utilisateur';

export type Permissions = {
    author: string[];
    book: string[];
    bookCollection: string[];
};

export const rolesPermissions: Record<Role, Permissions> = {
    admin: {
        author: ['read', 'write', 'delete'],
        book: ['read', 'write', 'delete'],
        bookCollection: ['read', 'write', 'delete'],
    },
    gerant: {
        author: ['read', 'write'],
        book: ['read', 'write'],
        bookCollection: ['read', 'write', 'delete'],
    },
    utilisateur: {
        author: ['read'],
        book: ['read', 'write'],
        bookCollection: ['read'],
    },
};