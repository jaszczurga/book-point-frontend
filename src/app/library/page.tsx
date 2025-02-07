import {BooksGridPaginated} from "@/components/booksGrid/BooksGridPaginated";


export default async function Books({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    return (
      <div >
            <div className="h-full flex flex-col ">
                <BooksGridPaginated/>
            </div>
      </div>
    );
}


