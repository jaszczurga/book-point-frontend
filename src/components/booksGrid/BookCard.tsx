'use client';
import Image from "next/image";
import {Card} from "@/components/reusable/Card";
import {Book} from "@/actions/getBooks";
import {useSession} from "next-auth/react";


type Props = {
    book: Book;
}

export const BookCard: React.FC<Props> = ({book}) => {

    const borrowHateos = book.links.find(link => link.rel === 'createLoan');
    const {data} = useSession();

    const handleBorrow = async () => {
        if (borrowHateos) {
            try {
                const requestBody = {
                    borrowDate: new Date().toISOString(),
                    returnDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
                    state: "BORROWED"
                };

                const response = await fetch(borrowHateos.href, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data?.accessToken}`,
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) throw new Error("Failed to borrow book");
                alert('Book borrowed successfully');
            } catch (error) {
                console.error("Error borrowing book:", error);
                alert('Failed to borrow book');
            }
        }
    };

    return (
        <Card>
            <div className="flex flex-col items-center w-full">
                <div className={"relative h-[150px] w-full"}>
                    <Image src={book.img} alt={book.title} className="object-cover rounded-sm" fill/>
                </div>
                <div className={"flex flex-col items-start"}>
                    <h1 className={"text-md"}>Title: {book.title}</h1>
                    <p className={"text-md"}>Author: {book.author}</p>
                    <p>Status: {book.status}</p>
                </div>
                {book.status === 'AVAILABLE' && (
                    <button className={"bg-blue-500 text-white p-2 rounded-md"} onClick={handleBorrow}>Borrow</button>
                )}
                {book.status === 'BORROWED' && (
                    <button className={"bg-red-500 text-white p-2 rounded-md"} disabled>Reserved</button>
                )}

            </div>
        </Card>
    )
}