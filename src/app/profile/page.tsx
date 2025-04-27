import { redirect } from "next/navigation";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import { Book, Link, Page } from "@/actions/getBooks";
import { URLBuilder } from "@/lib/backendApi/URLBuilder";
import { UserSection } from "@/components/profile/userSection";
import {BorrowedBooks} from "@/components/profile/BorrowedBooks";
import {Pagination} from "@/components/reusable/Pagination";
import {CheckboxSingle} from "@/components/reusable/CheckboxSingle";
import {auth} from "@/lib/auth";


type Props = {
    searchParams?: Promise<{
        page?: string;
        state?: string;
    }>;
}

export default async function Account(props: Props) {
    const searchParams = await props.searchParams;
    const session = await auth();
    if (!session) {
        redirect("/");
    }

    const api = new FetchWrapper(session.accessToken);
    let LoansResponse;
    let CustomerResponse;

    try {
        CustomerResponse = await api.get<CustomerResponse>(ApiConfig.Endpoints.Customer.getCurrent);
    } catch (e) {
        console.error("Failed to fetch customer", e);
    }

    try {
        const url = URLBuilder.builder
            .setBaseUrl(ApiConfig.Endpoints.Loans.userLoans)
            .addParam("page", searchParams?.page || "0")
            .addParam("state", searchParams?.state || "")
            .addParam("size", "4")
            .addParam("sort", "createdDate,desc")
            .toString();

        LoansResponse = await api.get<LoanResponse>(url);
    } catch (e) {
        console.error("Failed to fetch loans", e);
    }

    return (
        <div className="max-w-5xl mx-auto p-6 rounded-xl">
            {CustomerResponse ? <UserSection customer={CustomerResponse} session={session} /> : <p className="text-red-500">Could not load user details</p>}
            <CheckboxSingle param={"state"} title={"borrowed books"} toggleValue={"BORROWED"} />
            {LoansResponse && LoansResponse.content.length > 0 ? (
                <BorrowedBooks Loans={LoansResponse.content} session={session} />
            ) : (
                <p className="text-xl font-semibold text-gray-700 text-center mt-10">No loans found.</p>
            )}
            <Pagination totalPages={LoansResponse?.page.totalPages || 0} className={"my-5"}/>
        </div>
    );
}

export interface Loan {
    loanUuid: string;
    borrowDate: string;
    returnDate: string;
    state: string;
    customerUUID: string;
    bookUUID: string;
    createdAt: string;
    updatedAt: string;
    book: Book;
    _links: LoanHateoas;
}

export interface LoanHateoas {
    deleteLoan: Link;
    book: Link;
    returnBook: Link;
}

export interface LoanResponse {
    content: Loan[];
    page: Page;
}

export interface CustomerResponse {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    _links: CustomerHateoas;
}

export interface CustomerHateoas {
    books: Link;
    loans: Link;
}
