import {useEffect, useState} from "react";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Category} from "@/components/addBookForm/addBookForm";


type Props = {
    category: Category;
    setCategory?: (category: string) => void;
    register: any;
}

interface SubCategory {
    id: string;
    name: string;
    parentId: string;
}

export const CategoryDropDown: React.FC<Props> = ({category, setCategory, register}) => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const api = new FetchWrapper();

    useEffect(() => {
        const fetchSubCategories = async () => {
            const subCategoriesResponse = await api.get<SubCategory[]>(`/categories/${category.id}/subcategories`);
            setSubCategories(subCategoriesResponse);
        };
        fetchSubCategories();
    }, []);

    return (
        <select
            {...register(`categories.${category.id}`)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            {subCategories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
            ))}
        </select>
    )
}