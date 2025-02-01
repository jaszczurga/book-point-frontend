import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {Book} from "@/actions/getBooks";
import {notFound} from "next/navigation";
import {BookDetails} from "@/components/BookDetails/BookDetails";

export default async function Page({params}: {params: Promise<{bookId: string}>}) {

    const { bookId } = await params;
    let book: Book | undefined;

    const api = new FetchWrapper();
    try{
        book = await api.get<Book>(`${ApiConfig.Endpoints.Books.GetById}/${bookId}`);
        console.log(book);
    }catch (e){
        notFound();
        console.log(e);
    }

    return (
        book && (
            <BookDetails book={book}/>
        )
    )
}