

interface Props {
    BooksList: Book[];
}

export type Book = {
    title: string;
    image: File;
}

export const BooksList: React.FC<Props> = (BookList) => {
    return (
        <div>
            {BookList.BooksList.map((book) => (
                <div key={book.title}>
                    {book.title}
                </div>
            ))}
        </div>
    );
}