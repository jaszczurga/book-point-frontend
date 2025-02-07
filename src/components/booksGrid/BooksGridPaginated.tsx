'use client';
import {BookCard} from "@/components/booksGrid/BookCard";
import {useEffect, useState} from "react";
import {Book, BooksResponse} from "@/actions/getBooks";
import {Pagination} from "@/components/reusable/Pagination";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {Filter} from "@/components/booksGrid/Filter/Filter";
import {FilterList} from "@/components/booksGrid/Filter/FilterList";
import {CategoryFull} from "@/components/addBookForm/addBookForm";
import {URLBuilder} from "@/lib/backendApi/URLBuilder";
import {Search} from "@/components/reusable/Search";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {SearchBook} from "@/components/reusable/SearchBook";


export const BooksGridPaginated = () => {
    const size = 12;
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<CategoryFull[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
    const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const api = new FetchWrapper();


    const toggleCategoryFilter = (categoryName: string) => {
        setCategoriesFilter((prev) =>
            prev.includes(categoryName)
                ? prev.filter((category) => category !== categoryName)
                : [...prev, categoryName]
        );
        console.log(categoriesFilter);
    };

    const handleQueryChange = (query: string) => {
        setSearchQuery(query);
        setPage(0);
    }

    useEffect(() => {
        if(searchParams.has('page')){
            setPage(Number(searchParams.get('page')));
        }
        if(searchParams.has('q')){
            setSearchQuery(searchParams.get('q') as string);
        }
        if(searchParams.has('available')){
            setOnlyAvailable(searchParams.get('available') === 'true');
        }

            const url = URLBuilder
                .builder
                .setBaseUrl(ApiConfig.Endpoints.Books.All)
                .addParam('page', page)
                .addParam('size', size)
                .addParam('status', onlyAvailable ? 'available' : '')
                .addParam('categories', categoriesFilter)
                .addParam('searchQuery', searchQuery)
                .toString();
            console.log(url);

        const fetchBooks = async () => {
            const bookResponse = await api.get<BooksResponse>(url);
            setBooks(bookResponse.content);
            setTotalPages(bookResponse.page.totalPages);
        }
        fetchBooks();
    }
    , [page,categoriesFilter,searchQuery,onlyAvailable]);

    useEffect(() => {
            const fetchCategories = async () => {
                const categoriesResponse = await api.get<CategoryFull[]>(ApiConfig.Endpoints.Categories.AllFull);
                setCategories(categoriesResponse);
            };
            fetchCategories();
        }
        , []);

    return (
        <div className={"flex flex-col mb-10"}>
            <div className={"w-full h-full flex justify-center bg-blue-900"}>
                <SearchBook
                    className={"p-3 md:w-[60%] w-[80%] my-5"}
                    placeholder={"Search by: title, author, isbn"}
                    defaultQuery={searchQuery}
                />
            </div>
            {
                categoriesFilter.length > 0 && (
                    <div className={"flex flex-wrap justify-center items-center mt-5 gap-3"}>
                        {categoriesFilter.map((category) => (
                            <div
                                key={category}
                                className={"bg-blue-100 border border-blue-300 text-blue-500 px-4 py-2 rounded-md shadow-md"}
                            >
                                <p className={"text-sm"}>{category}</p>
                            </div>
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
                            <Filter key={category.id} category={category}/>
                        ))
                    }
                    <div className="flex items-center justify-start mx-4 my-2">
                        <input
                            type="checkbox"
                            id="onlyAvailable"
                            checked={onlyAvailable}
                            onChange={() => setOnlyAvailable(prev => !prev)}
                            className="mr-2 w-4 h-4"
                        />
                        <label htmlFor="onlyAvailable" className="text-colorHeader text-sm">Show only available books</label>
                    </div>
                </FilterList>
            </div>
            <Pagination totalPages={5}/>
        </div>
    )
}