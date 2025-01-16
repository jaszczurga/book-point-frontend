import {auth} from "@/app/api/auth/[...nextauth]/route";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {BookCard} from "@/components/booksGrid/BookCard";
import {redirect} from "next/navigation";


export default async function Books() {

    const session = await auth();
    if(!session){
        redirect('/');
    }

    const api = new FetchWrapper(session?.accessToken ?? '');
    const booksList = await api.get<BooksResponse>(ApiConfig.Endpoints.Books.All)
    // const booksList = await api.get<BooksResponse>(ApiConfig.Endpoints.Books.All).on("401", () => {
    //     console.log("Unauthorized");
    // });

    return (
      <div >
            <div className="h-full flex justify-center items-center text-black">
                    {booksList.content.map(book => (
                        <BookCard book={book} key={book.id}/>
                    ))}
            </div>
      </div>
    );
}

interface Link {
    rel: string;
    href: string;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    img: string;
    customer_email: string;
    customer_id: string;
    author: string | null;
    isbn: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    links: Link[];
}

interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

interface BooksResponse {
    content: Book[];
    page: Page;
}