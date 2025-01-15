'use client'

import { useForm } from "react-hook-form";
import { FormSchema, IAddBookFormSchema } from "@/components/addBookForm/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {FileDrop} from "@/components/addBookForm/fileDrop";
import {Session} from "next-auth";
import {addBook} from "@/actions/addBook";

type Props = Partial<{
    session: Session;
    title: string;
    description: string;
    author: string;
    isbn: string;
    imgUrl: string;
    categories: string[];
}>;

export const AddBookForm: React.FC<Props> = ({session, title, description, author, isbn, imgUrl, categories }) => {
    const { register,control,handleSubmit,formState: {errors}} = useForm<IAddBookFormSchema>({ resolver: zodResolver(FormSchema) });

    const onSubmit =  async (data: IAddBookFormSchema) => {
        console.log("Form data", data);
        alert("Book added successfully");
        await addBook(data, session);
    }

    return (
        <div className="max-w-lg mx-auto my-10 md:min-w-form-md min-w-form-sm shadow-lg p-8 rounded-lg bg-white border border-gray-200">
            <h2 className="text-2xl font-bold text-colorHeader mb-6 text-center">Add a New Book</h2>
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
