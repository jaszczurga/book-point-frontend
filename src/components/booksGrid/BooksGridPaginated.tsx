'use client';
import {BookCard} from "@/components/booksGrid/BookCard";
import {useEffect, useState} from "react";
import {Book, BooksResponse} from "@/actions/getBooks";
import {Pagination} from "@/components/reusable/Pagination";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {Filter} from "@/components/booksGrid/Filter/Filter";
import {FilterList} from "@/components/booksGrid/Filter/FilterList";
import { CategoryFull} from "@/components/addBookForm/addBookForm";
import {ParamValue, URLBuilder} from "@/lib/backendApi/URLBuilder";
import {Search} from "@/components/reusable/Search";

export const BooksGridPaginated = () => {
    const size = 12;
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<CategoryFull[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

    const api = new FetchWrapper();


    const toggleCategoryFilter = (categoryName: string) => {
        setCategoriesFilter((prev) =>
            prev.includes(categoryName)
                ? prev.filter((category) => category !== categoryName)
                : [...prev, categoryName]
        );
        console.log(categoriesFilter);
    };

    useEffect(() => {
            const url = URLBuilder
                .builder
                .setBaseUrl(ApiConfig.Endpoints.Books.All)
                .addParam('page', page)
                .addParam('size', size)
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
    , [page,categoriesFilter,searchQuery]);

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
                <Search setSearchQuery={setSearchQuery} className={"p-3 md:w-[60%] w-[80%] my-5"} placeholder={"Search by: title, author, isbn"}/>
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
                        <BookCard book={book} key={book.id}/>
                    ))}
                </div>
                <FilterList className={"md:w-[30%] w-full"}>
                    {
                        categories.map((category) => (
                            <Filter key={category.id} category={category} toggleCategory={toggleCategoryFilter}/>
                        ))
                    }
                </FilterList>
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
        </div>
    )
}