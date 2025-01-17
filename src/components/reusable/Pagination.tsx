'use client';
type Props = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}


export const Pagination: React.FC<Props> = ({page, totalPages, setPage}) => {

    return(
        <div className="flex justify-center space-x-4">
            <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="bg-green-700 text-white text-xl p-3 rounded-md"
            >
                Previous
            </button>
            <button
                disabled={page === totalPages-1}
                onClick={() => setPage(page + 1)}
                className="bg-green-700 text-white text-xl p-3 rounded-md"
            >
                Next
            </button>
        </div>
    )

}