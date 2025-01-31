import {Book} from "@/actions/getBooks";


type Props = {
    book: Book;
}

export const  BookDetails: React.FC<Props> = ({book}) => {
    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.status}</p>
        </div>
        );
}