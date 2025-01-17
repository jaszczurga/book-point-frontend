'use client';
import {ArrowRight} from "@/components/icons/ArrowRight";
import {ArrowLeft} from "@/components/icons/ArrowLeft";

type Props = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}


export const Pagination: React.FC<Props> = ({page, totalPages, setPage}) => {

    return(
        <div className="flex justify-center items-center space-x-4">
            <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="bg-pureWhite text-colorHeader text-xl p-3 rounded-md"
            >
                <ArrowLeft />
            </button>
            <span className="text-black p-2">{page+1} ... {totalPages}</span>
            <button
                disabled={page === totalPages-1}
                onClick={() => setPage(page + 1)}
                className="bg-pureWhite text-colorHeader text-xl p-3 rounded-md"
            >
                <ArrowRight />
            </button>
        </div>
    )

}