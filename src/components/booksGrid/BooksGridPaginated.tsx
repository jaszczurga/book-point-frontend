
import { BookCard } from "@/components/booksGrid/BookCard";
import { Pagination } from "@/components/reusable/Pagination";
import { Filter } from "@/components/booksGrid/Filter/Filter";
import { FilterList } from "@/components/booksGrid/Filter/FilterList";
import { CategoryFull } from "@/components/addBookForm/addBookForm";
import { URLBuilder } from "@/lib/backendApi/URLBuilder";
import { Search } from "@/components/reusable/Search";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import Link from "next/link";
import {Book} from "@/actions/getBooks";

const fetchBooks = async (page: number, size: number, searchQuery: string, categoriesFilter: string[], onlyAvailable: boolean) => {
    const api = new FetchWrapper();
    const url = URLBuilder.builder
        .setBaseUrl(ApiConfig.Endpoints.Books.All)
        .addParam('page', page)
        .addParam('size', size)
        .addParam('status', onlyAvailable ? 'available' : '')
        .addParam('categories', categoriesFilter)
        .addParam('searchQuery', searchQuery)
        .toString();

    return await api.get<Book[]>(url);
};

const fetchCategories = async () => {
    const api = new FetchWrapper();
    return await api.get<CategoryFull[]>(ApiConfig.Endpoints.Categories.AllFull);
};

export default async function BooksGridPaginated({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const size = 12;
    const page = searchParams.page ? Number(searchParams.page) : 0;
    const searchQuery = searchParams.q || "";
    const onlyAvailable = searchParams.available === 'true';
    const categoriesFilter = searchParams.categories ? searchParams.categories.split(',') : [];

    let books: Book[] = [];
    try {
        const booksResponse = await fetchBooks(page, size, searchQuery, categoriesFilter, onlyAvailable);
        if (Array.isArray(booksResponse)) {
            books = booksResponse;
        }
    } catch (error) {
        console.error("Error fetching books:", error);
    }

    let categories: CategoryFull[] = [];
    try {
        const categoriesResponse = await fetchCategories();
        if (Array.isArray(categoriesResponse)) {
            categories = categoriesResponse;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }


    return (
        <div className={"flex flex-col mb-10"}>
            <div className={"w-full h-full flex justify-center bg-blue-900"}>
                {/*<Search*/}
                {/*    setSearchQuery={() => {}}*/}
                {/*    className={"p-3 md:w-[60%] w-[80%] my-5"}*/}
                {/*    placeholder={"Search by: title, author, isbn"}*/}
                {/*    defaultQuery={searchQuery}*/}
                {/*/>*/}
            </div>
            {categoriesFilter.length > 0 && (
                <div className={"flex flex-wrap justify-center items-center mt-5 gap-3"}>
                    {categoriesFilter.map((category) => (
                        <div key={category} className={"bg-blue-100 border border-blue-300 text-blue-500 px-4 py-2 rounded-md shadow-md"}>
                            <p className={"text-sm"}>{category}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className={"flex md:flex-row flex-col-reverse items-start md:mx-36 sm:mx-20 mx-8 mt-5 mb-5"}>
                <div className={"w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-4"}>
                    {books.map((book: any) => (
                        <Link key={book.id} href={`/library/${book.id}`}>
                            <BookCard book={book} key={book.id} />
                        </Link>
                    ))}
                </div>
                <FilterList className={"md:w-[30%] w-full"}>
                    {categories.map((category) => (
                        <Filter key={category.id} category={category} toggleCategory={() => {}} />
                    ))}
                    <div className="flex items-center justify-start mx-4 my-2">
                        <input type="checkbox" id="onlyAvailable" checked={onlyAvailable} readOnly className="mr-2 w-4 h-4" />
                        <label htmlFor="onlyAvailable" className="text-colorHeader text-sm">Show only available books</label>
                    </div>
                </FilterList>
            </div>
            <Pagination page={page} totalPages={10} setPage={() => {}} />
        </div>
    );
}
