'use server';
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Session} from "next-auth";
import ApiConfig from "@/lib/backendApi/apiConfiguration";


export const addBook = async (book: BookRequestDto, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken ?? '');
    return api.post<BookResponseDto,BookRequestDto>(ApiConfig.Endpoints.Books.Create, book);
}

interface BookRequestDto {
    title: string;
    description: string;
    status?: string;
    author: string;
    isbn: string;
    categories?: string[];
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