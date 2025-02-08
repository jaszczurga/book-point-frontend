import {BooksGridPaginated} from "@/components/booksGrid/BooksGridPaginated";

type Props = {
    searchParams?: Promise<{
        searchQuery?: string;
        page?: string;
        categories?: string;
        status?: string;
    }>;
}

export default async function Books(props: Props) {

    const searchParams = await props.searchParams;
    return (
      <div >
            <div className="h-full flex flex-col ">
                <BooksGridPaginated searchParams={searchParams}/>
            </div>
      </div>
    );
}


