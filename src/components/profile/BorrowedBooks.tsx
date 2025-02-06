'use client';
import {Loan} from "@/app/profile/page";
import {Session} from "next-auth";
import Image from "next/image";
import {formatDateToPolish, getDaysLeft} from "@/lib/utils/dateFormatter";
import {returnBook} from "@/actions/bookActions/returnBook";
import {useState} from "react";


type Props = {
    Loans: Loan[];
    session: Session;
}


export const BorrowedBooks: React.FC<Props> = ({Loans,session}) => {

    const [loans, setLoans] = useState<Loan[]>(Loans);

    const handleReturn = async (loan: Loan) => {
        try {
            console.log(loan.book)
            const res = await returnBook(`/loans/${loan.book.id}/return`, session);
            const updatedLoans = loans.map((l) => {
                if (l.book.id === loan.book.id) {
                    l.state = res.state;
                }
                return l;
            });
            setLoans(updatedLoans);
        } catch (e) {
            console.error("Failed to return book", e);
        }
    }


    return (
        <>
        <div className="mt-8">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Borrowed Books</h1>
            <div className="grid gap-6">
                {Loans.map((loan, index) => (
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
                            {
                                loan.state === 'BORROWED' && (
                                    <p className={`text-sm font-bold ${getDaysLeft(new Date().toString(), loan.returnDate) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {getDaysLeft(new Date().toString(), loan.returnDate) < 0 ? 'Overdue' : `Due in ${getDaysLeft(new Date().toString(), loan.returnDate)} days`}
                                    </p>
                                )
                            }
                            {
                                loan.state === 'RETURNED' && (
                                    <p className="text-sm font-bold text-green-600">Returned</p>
                                )
                            }
                        </div>
                        {
                            loan.state === 'BORROWED' && (
                                <button
                                    className="bg-green-500 text-white p-2 rounded-md"
                                    onClick={() => handleReturn(loan)}
                                >
                                    Return
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
        </>
);

}