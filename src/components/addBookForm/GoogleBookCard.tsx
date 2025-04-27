import Image from "next/image";
import {GoogleBook} from "@/components/addBookForm/GoogleBooksList";


type Props = {
    book: GoogleBook;
}

export const GoogleBookCard: React.FC<Props> = ({book}) => {


    return (
        <div
            data-testid="add-book-img-popup"
            className={"rounded-md border-0"}>
            <div className="flex flex-col justify-center items-center w-full bg-colorHeader">
                <div className={"relative flex justify-center items-center h-[250px] w-full"}>
                    <Image src={book?.img ? book.img : "http://localhost:4566/book-photos/wp7644556.webp" } alt={book.title} className="rounded-sm" width={150} height={150}/>
                </div>
                <div className={"flex flex-col items-start text-pureWhite"}>
                    <h1 className={"text-md"}>Title: {book.title}</h1>
                    <p className={"text-md"}>Author: {book?.authors?.[0] ? book.authors[0] : "unknown"}</p>
                </div>

            </div>
        </div>
    )
}