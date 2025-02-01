'use client';
import {Book} from "@/actions/getBooks";
import Image from "next/image";
import {BooksStatus} from "@/lib/utils/BooksStatus";
import {ShowMoreText} from "@/components/reusable/ShowMoreText";
import {borrowBook} from "@/actions/borrowBook";
import {useSession} from "next-auth/react";
import {useState} from "react";


type Props = {
    book: Book;
}

export const  BookDetails: React.FC<Props> = ({book}) => {

    const { data: session } = useSession();
    const [bookStatus, setBookStatus] = useState<string>(book.status);

    const handleBorrow =  async () => {
        console.log("Borrow button clicked"+ book._links);
        const borrowBookHateos = book._links.borrowBook;
        if(borrowBookHateos){
            await borrowBook(borrowBookHateos.href, session || undefined);
            setBookStatus(BooksStatus.BORROWED);
        }else {
            alert("Borrow link not found");
        }
    }

    const handleCheckAvailability = () => {
        console.log("Check availability button clicked");
    }

    return (
        <div className="flex flex-col md:flex-row items-center mx-10 md:mx-36 my-16 md:my-24 bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                <Image
                    src={book.img}
                    alt={book.title}
                    width={250}
                    height={350}
                    className="rounded-lg shadow-md"
                />
            </div>
            <div className="w-full md:w-2/3 p-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{book.title}</h1>
                <ShowMoreText text={book.description}/>
                <p className="text-gray-600 text-sm md:text-base mt-2"><strong>Status:</strong> {book.status}</p>
                <p className="text-gray-600 text-sm md:text-base"><strong>Author:</strong> {book.author}</p>
                <p className="text-gray-600 text-sm md:text-base"><strong>ISBN:</strong> {book.isbn}</p>
                {bookStatus === BooksStatus.AVAILABLE && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={handleBorrow}
                    >
                        Borrow now
                    </button>
                )}
                {bookStatus === BooksStatus.BORROWED && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={handleCheckAvailability}
                    >
                        Check Availability
                    </button>
                )}
            </div>
        </div>
    );
}