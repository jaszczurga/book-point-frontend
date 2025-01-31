import Image from "next/image";
import { Card } from "@/components/reusable/Card";
import { Book } from "@/actions/getBooks";
import {auth} from "@/app/api/auth/[...nextauth]/route";
import {BooksStatus} from "@/lib/utils/BooksStatus";

type Props = {
    book: Book;
};

export const BookCard: React.FC<Props> =({ book }) => {

    return (
        <Card>
            <div className="flex flex-col items-center w-full">
                <div className={"relative h-[150px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill />
                </div>
                <div className={"flex flex-col items-start"}>
                    <h1 className={"text-md"}>Title: {book.title}</h1>
                    <p className={"text-md"}>Author: {book.author}</p>
                    {
                        book.status === BooksStatus.AVAILABLE ? (
                            <p className={"text-blue-500 p-1 rounded-md"}>Borrow</p>
                        ) : (
                            <p className={" text-red-500 p-1 rounded-md"}>Unavailable</p>
                        )
                    }
                </div>
            </div>
        </Card>
    );
};
