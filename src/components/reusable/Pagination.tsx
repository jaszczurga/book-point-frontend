'use client';
import {ArrowRight} from "@/components/icons/ArrowRight";
import {ArrowLeft} from "@/components/icons/ArrowLeft";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {twMerge} from "tailwind-merge";

type Props = {
    totalPages: number;
    className?: string;
}


export const Pagination: React.FC<Props> = ({ totalPages,className}) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const currentPage = Number(searchParams.get('page')) || 0;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (pageNumber: number) => {
        replace(createPageURL(pageNumber), {scroll: false});
    }

    return(
        <div
            className={twMerge("flex justify-center items-center space-x-4",className)}
        >
            <button
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-pureWhite text-colorHeader text-xl p-3 rounded-md"
            >
                <ArrowLeft />
            </button>
            <span className="text-black p-2">{currentPage+1} ... {totalPages}</span>
            <button
                disabled={currentPage === totalPages-1}
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-pureWhite text-colorHeader text-xl p-3 rounded-md"
            >
                <ArrowRight />
            </button>
        </div>
    )

}