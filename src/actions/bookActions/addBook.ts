'use server';
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Session} from "next-auth";
import ApiConfig from "@/lib/backendApi/apiConfiguration";


export const addBook = async (book: BookToSave,bookImage: File, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken ?? '');

    const listOfCategories = Object.values(book.categories || {})
        .map(value => value.trim())
        .filter(value => value !== '');

    const formData = new FormData();
    formData.append("bookData",new Blob([JSON.stringify({
        title: book.title,
        description: book.description,
        author: book.author,
        isbn: book.isbn,
        categories: listOfCategories,
    })], {
        type: "application/json"
    }));
    formData.append("img", bookImage);
    return api.postForm<BookResponseDto,FormData>(ApiConfig.Endpoints.Books.Create, formData);
}

interface BookToSave {
    title: string;
    description: string;
    status?: string;
    author: string;
    isbn: string;
    categories?: String[];
}

interface BookResponseDto {
    id: string;
    title: string;
    description: string;
    img: string;
    customerEmail: string;
    customerId: string;
    author: string;
    isbn: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}