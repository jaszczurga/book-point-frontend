import {Book} from "@/app/library/page";
import Image from "next/image";
import {Card} from "@/components/reusable/Card";


type Props = {
    book: Book;
}

export const BookCard: React.FC<Props> = ({book}) => {
    return (
        <Card>
            <div className="flex flex-col items-center w-full">
                <div className={"relative h-[150px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill/>
                </div>
                    <h1 className={"text-md"}>Title: {book.title}</h1>
                    <p className={"text-md"}>Author: {book.author}</p>
            </div>
        </Card>
    )
}