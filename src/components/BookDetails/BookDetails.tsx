'use client';
import {Book} from "@/actions/getBooks";
import Image from "next/image";
import {BooksStatus} from "@/lib/utils/BooksStatus";
import {ShowMoreText} from "@/components/reusable/ShowMoreText";
import {borrowBook} from "@/actions/bookActions/borrowBook";
import {signIn, useSession} from "next-auth/react";
import {useState} from "react";
import {checkExternalSources, ExternalSourcesResponse} from "@/actions/checkExternalSources";
import {URLBuilder} from "@/lib/backendApi/URLBuilder";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {ConfirmBorrowDialog} from "@/components/BookDetails/ConfirmBorrowDialog";
import {FetchError} from "@/lib/backendApi/fetchWrapper";
import {CustomPopup} from "@/components/reusable/CustomPopup";
import {MouseIcon} from "@/components/icons/MouseIcon";


type Props = {
    book: Book;
}

export const  BookDetails: React.FC<Props> = ({book}) => {

    const { data: session } = useSession();
    const [bookStatus, setBookStatus] = useState<string>(book.status);
    const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sourceList, setSourceList] = useState<Source[] | null>(null);

    const closeBorrowDialog = () => {
        setIsBorrowDialogOpen(false);
    }

    const openBorrowDialog = () => {
        setIsBorrowDialogOpen(true);
    }

    const handleConfirmBorrow = async () => {
        console.log("Borrow confirmed");
        closeBorrowDialog();
        await handleBorrow();
    }

    const handleBorrow = async () => {
        if (!session) {
            await signIn("keycloak");
            return;
        }
        console.log(`Borrow button clicked: ${book._links}`);
        const borrowBookHateos = book?._links?.borrowBook;
        if (!borrowBookHateos) {
            alert("Borrow link not found");
            return;
        }
        try{
            await borrowBook(borrowBookHateos.href, session);
        }catch (e){
            if(e instanceof FetchError){
                setError(e.message);
            }
            return;
        }
        setBookStatus(BooksStatus.BORROWED);
    };

    const handleCheckAvailability = async () => {
        console.log("Check availability button clicked");
        const url = URLBuilder
            .builder
            .setBaseUrl(
                ApiConfig.BaseUrl+ApiConfig.Endpoints.ExternalCheck.checkAll)
            .addParam("isbn", book.isbn)
            .toString();

        try {
            const res: Source[] =  await checkExternalSources(url);
            setSourceList(res.filter((s) => s.records>0));
        }catch (e){
            console.error("Error checking external sources", e);
        }
    }



    return (
        <>
            {error && <CustomPopup message={error} onClose={() => setError(null)} />}
            {
                isBorrowDialogOpen && (
                    <ConfirmBorrowDialog book={book} onClose={closeBorrowDialog} onConfirm={handleConfirmBorrow}/>
                )
            }
        <div className="flex flex-col md:flex-row items-center mx-10 md:mx-36 my-16 md:my-24 bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-full md:w-1/3 flex self-start justify-center mb-6 md:mb-0">
                <Image
                    src={book.img}
                    alt={book.title}
                    width={250}
                    height={350}
                    className="rounded-lg shadow-md"
                />
            </div>
            <div className="w-full md:w-2/3 p-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{book.title}</h1>
                <ShowMoreText text={book.description}/>
                <p className="text-gray-600 text-sm md:text-base"><strong>Author:</strong> {book.author}</p>
                <p className="text-gray-600 text-sm md:text-base"><strong>ISBN:</strong> {book.isbn}</p>
                <div className={"flex flex-col max-w-[150px]"}>
                    {bookStatus === BooksStatus.AVAILABLE && (
                        <button
                            data-testid="borrow-button"
                            className="bg-green-500 text-white p-2 rounded-md mt-4"
                            onClick={openBorrowDialog}
                        >
                            Borrow now
                        </button>
                    )}
                    <button
                        data-testid="check-availability"
                        className="bg-colorHeader text-white p-2 rounded-md mt-4"
                        onClick={handleCheckAvailability}
                    >
                        Check Availability
                    </button>
                </div>
                    {/*{ ugRecords !==null && ugRecords > 0 && (*/}
                    {/*    <div className="mt-2 flex items-center space-x-2">*/}
                    {/*        <a*/}
                    {/*            href={`https://katalog-bug.ug.edu.pl/discovery/search?query=any,contains,${book.isbn}&tab=Everything&search_scope=MyInst_and_CI&vid=48FAR_UGD:48UGD&offset=0`}*/}
                    {/*            target="_blank"*/}
                    {/*            rel="noopener noreferrer"*/}
                    {/*            className="flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200"*/}
                    {/*        >*/}
                    {/*            <div className="text-colorHeader hover:text-green-500 text-sm flex flex-row justify-center items-center">*/}
                    {/*                <MouseIcon className={"text-green-500"}/> {ugRecords} records found at University of Gdansk*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                {
                    sourceList && sourceList.length>0 && (
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">External sources</h3>
                            <ul className="list-disc list-inside">
                                {
                                    sourceList.map((source) => (
                                        <div key={source.sourceName} className={"flex flex-row items-center my-3 text-colorHeader  hover:text-green-500"}>
                                            <MouseIcon/>
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm"
                                            >
                                                {source.sourceName} - {source.records} records
                                            </a>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                    {
                        sourceList && sourceList.length===0 && (
                            <p className="text-red-600 text-sm">No records found</p>
                        )
                    }
            </div>
        </div>
        </>
    );
}


export interface Source {
    records: number;
    sourceName: string;
    url: string;
}