import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Session} from "next-auth";
import {BooksStatus} from "@/lib/utils/BooksStatus";


export const borrowBook = async (url:string, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken, '');
    return await api.get<Loan>(url);
}

interface Loan {
    loanUuid: string;
    borrowDate: string; // ISO string format
    returnDate: string; // ISO string format
    state: BooksStatus
    customerUUID: string;
    bookUUID: string;
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    _links: LoanLinks;
}

interface LoanLinks {
    self: Link;
    deleteLoan: Link;
}

interface Link {
    href: string;
}
