import {Book} from "@/actions/getBooks";
import React from "react";
import { format } from "date-fns";

type Props = {
    book?: Book;
    onClose?: () => void;
    onConfirm?: () => void;
}

export const ConfirmBorrowDialog: React.FC<Props> = ({ book, onClose, onConfirm }) => {
    return (
        <div
            className="h-full fixed bg-black bg-opacity-40 w-full start-0 top-0 z-10 flex justify-center items-center"
            onClick={onClose}
        >
            <div className="h-auto w-[600px] bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Borrowing</h2>
                {book ? (
                    <div>
                        <p className="text-lg text-gray-700">You're borrowing:</p>
                        <p className="text-lg font-medium text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                        <p className="mt-4 text-md text-gray-700">Return Date: <span className="font-medium text-blue-600">{getReturnDate()}</span></p>
                    </div>
                ) : (
                    <p className="text-md text-gray-700">No book selected.</p>
                )}
                <div className="mt-6 flex justify-end gap-3">
                    <button  onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

const getReturnDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return format(today, "MMMM dd, yyyy");
};
