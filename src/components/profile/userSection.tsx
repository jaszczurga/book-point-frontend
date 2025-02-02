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
        <div>
            <div className="flex flex-col justify-center items-center">
                <p className={"text-colorHeader"}>Hello {customer.firstname}</p>
                {booksRes ? <p className={"text-colorHeader"}>You have added {booksRes.length} books</p> : <p>Failed to load number of user books</p>}
            </div>
        </div>
    )
}
