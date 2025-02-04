import {CustomerResponse} from "@/app/profile/page";
import fetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Session} from "next-auth";
import {Book} from "@/actions/getBooks";

type Props = {
    customer: CustomerResponse;
    session: Session;
}

export const UserSection: React.FC<Props> = async ({customer,session}) => {

    const bookUrl = customer._links.books.href;
    let booksRes: Book[] | undefined = undefined;
    try{
        const api = new fetchWrapper(session.accessToken,'');
        booksRes = await api.get<Book[]>(bookUrl);
    }catch (e) {
        console.error(e);
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-semibold text-gray-800">Hello, {customer.firstname}!</h2>
            {booksRes ? (
                <p className="text-gray-700 mt-2">
                    You have added <span className="font-bold">{booksRes.length}</span> books.
                </p>
            ) : (
                <p className="text-red-500 mt-2">Failed to load your books.</p>
            )}
        </div>
    )
}
