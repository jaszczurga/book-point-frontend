import Image from "next/image";
import { Card } from "@/components/reusable/Card";
import { Book } from "@/actions/getBooks";
import {auth} from "@/app/api/auth/[...nextauth]/route";
import {BooksStatus} from "@/lib/utils/BooksStatus";
import Link from "next/link";

type Props = {
    book: Book;
};

export const BookCard: React.FC<Props> =({ book }) => {

    return (
        <Card testId={"book-card"}>
            <div className="flex flex-col items-center w-full">
                <div className={"relative h-[150px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill />
                </div>
                <div className={"flex flex-col text-sm p-2 w-full h-32"}>
                    <h1>Title: {book.title}</h1>
                    <p>Author: {book.author?.split(',')[0]}</p>
                    <span className={"h-full"}></span>
                    {
                        book.status === BooksStatus.AVAILABLE ? (
                            <p className={"text-green-500 p-1 rounded-md"}>Available</p>
                        ) : (
                            <p className={" text-red-500 p-1 rounded-md"}>Check Availability</p>
                        )
                    }
                </div>
            </div>
        </Card>
    );
};
