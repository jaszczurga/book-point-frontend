"use client";
import Image from "next/image";
import { Card } from "@/components/reusable/Card";
import { Book } from "@/actions/getBooks";
import { useSession } from "next-auth/react";
import { borrowBook } from "@/actions/borrowBook";
import { BooksStatus } from "@/lib/utils/BooksStatus";
import { useState } from "react";

type Props = {
    book: Book;
};

export const BookCard: React.FC<Props> = ({ book }) => {
    const { data: session } = useSession();

    // Maintain local state for book status
    const [bookStatus, setBookStatus] = useState(book.status);

    const borrowHateos = book.links.find((link) => link.rel === "borrowBook");

    const handleBorrow = async () => {
        if (borrowHateos) {
            await borrowBook(borrowHateos.href, session ?? undefined);
            setBookStatus(BooksStatus.BORROWED); // Update state to trigger re-render
        }
    };

    return (
        <Card>
            <div className="flex flex-col items-center w-full">
                <div className={"relative h-[150px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill />
                </div>
                <div className={"flex flex-col items-start"}>
                    <h1 className={"text-md"}>Title: {book.title}</h1>
                    <p className={"text-md"}>Author: {book.author}</p>
                    <p>Status: {bookStatus}</p>
                </div>
                {bookStatus === "AVAILABLE" && (
                    <button className={"bg-blue-500 text-white p-2 rounded-md"} onClick={handleBorrow}>
                        Borrow
                    </button>
                )}
                {bookStatus === "BORROWED" && (
                    <button className={"bg-red-500 text-white p-2 rounded-md"} disabled>
                        unavailable
                    </button>
                )}
            </div>
        </Card>
    );
};
