import React, { useEffect, useState } from "react";
import { BookCard } from "@/components/booksGrid/BookCard";
import { Search } from "@/components/reusable/Search";
import { URLBuilder } from "@/lib/backendApi/URLBuilder";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {GoogleBookCard} from "@/components/addBookForm/GoogleBookCard";

type Props = {
    handleClose: (book: any) => void;
    setBook: (book: any) => void;
};


export const GoogleBooksList: React.FC<Props> = ({ handleClose,setBook }) => {
    const [searchTerm, setSearchTerm] = useState("Java");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [books, setBooks] = useState<GoogleBook[]>([]);
    const api = new FetchWrapper();

    const fetchBooks = async () => {
        try {
            const url = URLBuilder.builder
                .setBaseUrl(ApiConfig.Endpoints.GoogleBooks.Search)
                .addParam("title", searchTerm)
                .toString();
            const bookResponse = await api.get<GoogleBook[]>(url);
            setBooks(bookResponse || []);
        } catch (error) {
            console.error("Failed to fetch books:", error);
            setBooks([]);
        }
    };

    useEffect(() => {
        if (!searchTerm) {
            setBooks([]);
            return;
        }
        fetchBooks();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
    };

    const handleChooseBook = () => {
        setBook(books[currentImageIndex]);
        handleClose(books[currentImageIndex]);
    }

    return (
        <div
            className="h-full fixed bg-black bg-opacity-40 w-full start-0 top-0 z-10"
            onClick={() => handleClose(null)}
        >
            <div className="h-full flex justify-center items-center">
                <div
                    className="h-auto w-[600px] z-11 bg-colorHeader p-6 rounded-lg"
                    onClick={(e) => e.stopPropagation()} // Prevent closing on inner div click
                >
                    <Search setSearchQuery={setSearchTerm} search={fetchBooks} />

                    {/* Image Slider */}
                    <div className="flex flex-col items-center">
                        {books.length > 0 ? (
                            <>
                                <div className="relative h-[280px] w-[60%] mt-10" onClick={handleChooseBook}>
                                    <GoogleBookCard book={books[currentImageIndex]} />
                                </div>
                                <div className="flex justify-between w-full mt-4">
                                    <button
                                        onClick={handlePrev}
                                        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                                        aria-label="Previous book"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                                        aria-label="Next book"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-center mt-10 text-gray-600">No books found. Try searching for something!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};




interface Link {
    rel: string;
    href: string;
}

export interface GoogleBook {
    title: string;
    description: string;
    img: string | null;
    authors: string[] | null;
    isbn: string;
    googleBookId: string;
    publishedDate: string;
    links: Link[];
}
