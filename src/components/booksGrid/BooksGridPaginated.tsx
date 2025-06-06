import {BookCard} from "@/components/booksGrid/BookCard";
import {Book, BooksResponse} from "@/actions/getBooks";
import {Pagination} from "@/components/reusable/Pagination";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {Filter} from "@/components/booksGrid/Filter/Filter";
import {FilterList} from "@/components/booksGrid/Filter/FilterList";
import {CategoryFull} from "@/components/addBookForm/addBookForm";
import {URLBuilder} from "@/lib/backendApi/URLBuilder";
import Link from "next/link";
import {SearchBook} from "@/components/reusable/SearchBook";
import {AvailableBookCheckbox} from "@/components/booksGrid/Filter/AvailableBookCheckbox";
import {UsedCategoryCard} from "@/components/booksGrid/Filter/UsedCategoryCard";

type Props = {
    searchParams: {
        searchQuery?: string;
        page?: string;
        categories?: string;
        status?: string;
    } | undefined;
}

export const BooksGridPaginated: React.FC<Props> = async ({searchParams}) => {
    const size = 12;

    let books: Book[] = [];
    let categories: CategoryFull[] = [];
    let totalPageCount = 0;

    const api = new FetchWrapper();

            const url = URLBuilder
                .builder
                .setBaseUrl(ApiConfig.Endpoints.Books.All)
                .addParam('page', searchParams?.page || 0)
                .addParam('size', size)
                .addParam('status', searchParams?.status ? 'available' : '')
                .addParam('categories', searchParams?.categories)
                .addParam('searchQuery', searchParams?.searchQuery || '')
                .toString();
            console.log(url);

            try {
                const bookResponse = await api.get<BooksResponse>(url);
                books = bookResponse.content;
                totalPageCount = bookResponse.page.totalPages;
            }catch (e) {
                console.error(e);
            }

            try {
                categories = await api.get<CategoryFull[]>(ApiConfig.Endpoints.Categories.AllFull);
            }catch (e) {
                console.error(e);
            }

    return (
        <div className={"flex flex-col mb-10"}>
            <div className={"w-full h-full flex justify-center bg-blue-900"}>
                <SearchBook
                    className={"p-3 md:w-[60%] w-[80%] my-5"}
                    placeholder={"Search by: title, author, isbn"}
                />
            </div>
            {
                searchParams?.categories && (
                    <div className={"flex flex-wrap justify-center items-center mt-5 gap-3"}>
                        {searchParams.categories.split(',').map((category) => (
                            <UsedCategoryCard category={category} key={category}/>
                        ))}
                    </div>
                )
            }
            <div className={"flex md:flex-row flex-col-reverse items-start md:mx-36 sm:mx-20 mx-8 mt-5 mb-5"}>
                <div className={" w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-4"}>
                    {books.map(book => (
                        <Link key={book.id} href={`/library/${book.id}`}>
                        <BookCard book={book} key={book.id}/>
                        </Link>
                    ))}
                </div>
                <FilterList className={"md:w-[30%] w-full"}>
                    {
                        categories.map((category) => (
                            <Filter key={category.id} category={category} />
                        ))
                    }
                    <AvailableBookCheckbox />
                </FilterList>
            </div>
            <Pagination totalPages={totalPageCount}/>
        </div>
    )
}