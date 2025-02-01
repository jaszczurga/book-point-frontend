
export interface Link {
    rel: string;
    href: string;
}

export interface BookHateoas {
    borrowBook: Link;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    img: string;
    customer_email: string;
    customer_id: string;
    author: string | null;
    isbn: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    _links: BookHateoas;
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface BooksResponse {
    content: Book[];
    page: Page;
}