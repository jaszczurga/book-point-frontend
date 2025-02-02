import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import { Book, Link, Page } from "@/actions/getBooks";
import Image from "next/image";
import { URLBuilder } from "@/lib/backendApi/URLBuilder";
import { formatDateToPolish, getDaysLeft } from "@/lib/utils/dateFormatter";
import { UserSection } from "@/components/profile/userSection";

export default async function Account() {
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
            .addParam("page", "0")
            .addParam("size", "1000")
            .addParam("sort", "borrowDate,desc")
            .toString();

        LoansResponse = await api.get<LoanResponse>(url);
    } catch (e) {
        console.error("Failed to fetch loans", e);
    }

    return (
        <div className="max-w-5xl mx-auto p-6 rounded-xl">
            {CustomerResponse ? <UserSection customer={CustomerResponse} session={session} /> : <p className="text-red-500">Could not load user details</p>}
            {LoansResponse && LoansResponse.content.length > 0 ? (
                <div className="mt-8">
                    <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Borrowed Books</h1>
                    <div className="grid gap-6">
                        {LoansResponse.content.map((loan, index) => (
                            <div key={index} className="flex items-center p-6 bg-gray-100 rounded-lg shadow-md">
                                <div className="relative w-40 h-40 flex-shrink-0 mr-6">
                                    <Image
                                        src={loan.book.img}
                                        alt={loan.bookUUID}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-2xl font-semibold text-gray-900">{loan.book.title}</p>
                                    <p className="text-sm text-gray-700">State: <span className="font-medium">{loan.state}</span></p>
                                    <p className="text-sm text-gray-700">Borrowed: <span className="font-medium">{formatDateToPolish(loan.borrowDate)}</span></p>
                                    <p className="text-sm text-gray-700">Return by: <span className="font-medium">{formatDateToPolish(loan.returnDate)}</span></p>
                                    <p className={`text-sm font-bold ${getDaysLeft(new Date().toString(), loan.returnDate) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {getDaysLeft(new Date().toString(), loan.returnDate) < 0 ? 'Overdue' : `Due in ${getDaysLeft(new Date().toString(), loan.returnDate)} days`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-xl font-semibold text-gray-700 text-center mt-10">No loans found.</p>
            )}
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
