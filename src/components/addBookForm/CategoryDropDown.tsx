import {CategoryFull} from "@/components/addBookForm/addBookForm";


type Props = {
    category: CategoryFull;
    setCategory?: (category: string) => void;
    register: any;
}

export const CategoryDropDown: React.FC<Props> = ({category, setCategory, register}) => {

    return (
        <select
            {...register(`categories.${category.id}`)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            {category.children.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
            ))}
        </select>
    )
}