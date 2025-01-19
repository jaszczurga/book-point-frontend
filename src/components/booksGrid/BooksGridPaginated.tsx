'use client';
import {BookCard} from "@/components/booksGrid/BookCard";
import {useEffect, useState} from "react";
import {Book, BooksResponse, getBooks} from "@/actions/getBooks";
import {Pagination} from "@/components/reusable/Pagination";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {Filter} from "@/components/booksGrid/Filter/Filter";

export const BooksGridPaginated = () => {
    const size = 12;
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const api = new FetchWrapper();

    useEffect(() => {
        const fetchBooks = async () => {
            const bookResponse = await api.get<BooksResponse>(`${ApiConfig.Endpoints.Books.All}?page=${page}&size=${size}`);
            setBooks(bookResponse.content);
            setTotalPages(bookResponse.page.totalPages);
        }
        fetchBooks();
    }
    , [page]);

    const filterPaams = {
        author: "",
        status: "",
        title: "",
        isbn: "",
        categories: [],
        page: 0,
        size: 12
    }

    return (
        <div className={"flex flex-col"}>
            <div className={"flex flex-row items-start"}>
                <div className={" w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-4"}>
                    {books.map(book => (
                        <BookCard book={book} key={book.id}/>
                    ))}
                </div>
                <Filter/>
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
        </div>
    )
}