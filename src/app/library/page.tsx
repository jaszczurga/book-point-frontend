import {auth} from "@/app/api/auth/[...nextauth]/route";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";


export default async function Books() {

    const session = await auth();
    const api = new FetchWrapper(session!.accessToken);
    const booksList = await api.get<BooksResponse>(ApiConfig.Endpoints.Books.All);

    return (
      <div >
            <div className="h-full flex justify-center items-center text-black">
                <ul>
                    {booksList.content.map(book => (
                        <li key={book.id}>
                            <h2>{book.title}</h2>
                            <p>{book.description}</p>
                            <img src={book.img} alt={book.title}/>
                        </li>
                    ))}
                </ul>
            </div>
      </div>
    );
}

interface Link {
    rel: string;
    href: string;
}

interface Book {
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