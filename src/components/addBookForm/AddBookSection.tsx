'use client'
import {AddBookForm} from "@/components/addBookForm/addBookForm";
import {LogoIcon} from "@/components/icons/Logo";
import {useState} from "react";
import {GoogleBook, GoogleBooksList} from "@/components/addBookForm/GoogleBooksList";

type Props = {
    session: any;
}

export const AddBookSection: React.FC<Props> = ({session}) => {

   const [isBookInfoOpen, setIsBookInfoOpen] = useState(false);
   const [book, setBook] = useState<GoogleBook | null>(null);

    return (
        <>
            {
                isBookInfoOpen && <GoogleBooksList handleClose={() => setIsBookInfoOpen(!isBookInfoOpen)} setBook={setBook}/>
            }
        <div className="max-w-lg mx-auto my-10 md:min-w-form-md min-w-form-sm shadow-lg p-8 rounded-lg bg-white border border-gray-200 relative">
            <h2 className="text-2xl font-bold text-colorHeader mb-6 text-center">Add a New Book</h2>
            <div
                className={"bg-green-600 hover:bg-green-700 w-10 h-10 rounded-3xl absolute top-5 end-5 flex justify-center items-center cursor-pointer"}
                onClick={() => setIsBookInfoOpen(!isBookInfoOpen)}
            >
                <LogoIcon className={"text-pureWhite"} />
            </div>
            <AddBookForm session={session} title={book?.title} description={book?.description} author={book?.authors?.toString()} isbn={book?.isbn} imgUrl={book?.img}/>
        </div>
        </>
    )
}