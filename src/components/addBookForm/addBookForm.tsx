'use client'

import {useFieldArray, useForm} from "react-hook-form";
import { FormSchema, IAddBookFormSchema } from "@/components/addBookForm/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {FileDrop} from "@/components/addBookForm/fileDrop";
import {Session} from "next-auth";
import {addBook} from "@/actions/bookActions/addBook";
import {useEffect, useState} from "react";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";
import {CategoryDropDown} from "@/components/addBookForm/CategoryDropDown";
import {fetchGoogleBook} from "@/actions/fetchGoogleBook";

type Props = Partial<{
    session: Session;
    title: string;
    description: string;
    author: string;
    isbn: string;
    imgUrl: string | null;
}>;

export interface Category {
    id: string;
    name: string;
    parentId: string;
}

export interface CategoryFull {
    id: string;
    name: string;
    parentId: string;
    children: Category[];
}

export const AddBookForm: React.FC<Props> = ({session, title, description, author, isbn, imgUrl }) => {
    const { register,control,handleSubmit,setValue, reset ,formState: {errors}} = useForm<IAddBookFormSchema>({ resolver: zodResolver(FormSchema),
    });
    const [categories, setCategories] = useState<CategoryFull[]>([]);
    const api = new FetchWrapper();
    const onSubmit =  async (data: IAddBookFormSchema) => {
        console.log("Form data", data);
        alert("Book added successfully");
        await addBook(data, data.bookImg, session);
    }

    useEffect(() => {
        if (title || description || author || isbn) {
            reset({
                title: title || "",
                description: description || "",
                author: author || "",
                isbn: isbn || "",
                bookImg: null,
            });
        }
    }, [title, description, author, isbn, reset]);

    useEffect(() => {
        const fetchImg = async () => {
            if (imgUrl) {
                 const fileBlob = await fetchGoogleBook(imgUrl)
                if(fileBlob) {
                    const file = new File([fileBlob], `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, { type: fileBlob.type });
                    setValue("bookImg", file);
                }
            }
        }
        const fetchCategories = async () => {
            const categoriesResponse = await api.get<CategoryFull[]>(ApiConfig.Endpoints.Categories.AllFull);
            setCategories(categoriesResponse);
        };
        fetchCategories();
        fetchImg();
    }
    , [imgUrl]);

    return (
            <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        {...register('title')}
                        type="text"
                        defaultValue={title}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book title"
                    />
                </div>
                {
                    errors?.title && <p className="text-colorError">{errors.title.message}</p>
                }
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register('description')}
                        defaultValue={description}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book description"
                        rows={4}
                    ></textarea>
                </div>
                {
                    errors?.description && <p className="text-colorError">{errors.description.message}</p>
                }
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        {...register('author')}
                        type="text"
                        defaultValue={author}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter author's name"
                    />
                </div>
                {
                    errors?.author && <p className="text-colorError">{errors.author.message}</p>
                }
                <div>
                    <label className="block text-sm font-medium text-gray-700">ISBN</label>
                    <input
                        {...register('isbn')}
                        type="text"
                        defaultValue={isbn}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter ISBN number"
                    />
                </div>
                {
                    errors?.isbn && <p className="text-colorError">{errors.isbn.message}</p>
                }
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <FileDrop control={control} name="bookImg"/>
                </div>
                {/*<CategoryDropDown category={categories[2]} register={register}/>*/}
                {
                    categories.length > 0 && (
                        <div>
                            {
                                categories.map((category) => (
                                    <div key={category.id}>
                                        <label
                                            className="block text-sm font-medium text-gray-700">Category: {category.name}</label>
                                            <CategoryDropDown category={category} register={register}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                    Submit
                </button>
            </form>
    )
}
