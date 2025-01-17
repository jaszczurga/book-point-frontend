import {BooksGridPaginated} from "@/components/booksGrid/BooksGridPaginated";

export default async function Books() {

    return (
      <div >
            <div className="h-full flex flex-col ">
                <BooksGridPaginated/>
            </div>
      </div>
    );
}


