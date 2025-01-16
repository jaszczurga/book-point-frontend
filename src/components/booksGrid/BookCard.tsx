import {Book} from "@/app/library/page";
import Image from "next/image";


type Props = {
    book: Book;
}

export const BookCard: React.FC<Props> = ({book}) => {
    return (
        <div className="max-w-md mx-auto my-10 md:min-w-card-md min-w-card-sm shadow-lg rounded-lg bg-white border border-gray-200">
            <div className="flex flex-col gap-4 items-center">
                <div className={"relative h-[300px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill/>
                </div>
                    <h1 className={"text-2xl"}>{book.title}</h1>
                    <p className={"text-lg"}>{book.author}</p>
            </div>
        </div>
    )
}