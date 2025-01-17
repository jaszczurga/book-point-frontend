'use client';
import {BookCard} from "@/components/booksGrid/BookCard";
import {useEffect, useState} from "react";
import {Book, getBooks} from "@/actions/getBooks";
import {Pagination} from "@/components/reusable/Pagination";

export const BooksGridPaginated = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const bookResponse = await getBooks(page, 2);
            setBooks(bookResponse.content);
            setTotalPages(bookResponse.page.totalPages);
        }
        fetchBooks();
    }
    , [page]);

    return (
        <div className={" w-full my-10 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-4"}>
            {books.map(book => (
                <BookCard book={book} key={book.id}/>
            ))}
            <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
        </div>
    )
}