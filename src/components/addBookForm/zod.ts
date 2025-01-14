import {z} from "zod";


export const FormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required." })
        .max(100, { message: "Title must be less than 100 characters." }),
    description: z
        .string()
        .min(1, { message: "Description is required." })
        .max(200, { message: "Description must be less than 200 characters." }),
    price: z
        .number()
        .min(1, { message: "Price must be greater than 0." }),
    // image: z
    //     .string()
    //     .url({ message: "Invalid URL format." }),
    category: z
        .string()
        .min(1, { message: "Category is required." }),
    isbn: z
        .string()
        .min(1, { message: "ISBN is required." }),
    author: z
        .string()
        .min(1, { message: "Author is required." }),
});

export type IAddBookFormSchema = z.infer<typeof FormSchema>;