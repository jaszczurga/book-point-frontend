'use client'
import {useState} from "react";
import {ArrowDown} from "@/components/icons/ArrowDown";
import {ArrowUp} from "@/components/icons/ArrowUp";
import {CategoryFull} from "@/components/addBookForm/addBookForm";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Props = {
    category: CategoryFull;
}

export const Filter: React.FC<Props> = ({category}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleCategoryChange = (categoryName: string) => {
        const params = new URLSearchParams(searchParams);
        const existingCategories = params.get('categories')?.split(',') || [];
        params.delete('page');
        if (existingCategories.includes(categoryName)) {
            const updatedCategories = existingCategories.filter(category => category !== categoryName);
            updatedCategories.length > 0
                ? params.set('categories', updatedCategories.join(','))
                : params.delete('categories');
        } else {
            params.set('categories', [...existingCategories, categoryName].join(','));
        }
        replace(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="text-colorHeader bg-pureWhite font-medium text-sm px-4 py-2.5 text-center inline-flex items-center justify-between w-full cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {category.name}
                {open ? <ArrowUp /> : <ArrowDown />}
            </div>
            <div
                className={`z-10 w-full p-3 transition-all duration-300 ${
                    open ? "block" : "hidden"
                }`}
            >
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                    {
                        category.children.map((category) => (
                            <li key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value=""
                                    defaultChecked={searchParams.get('categories')?.split(',').includes(category.name)}
                                    className="w-4 h-4 mx-2 bg-pureWhite text-colorHeader "
                                    onChange={() => handleCategoryChange(category.name)}
                                />
                                <label
                                    className="ml-2 text-sm font-medium"
                                >
                                    {category.name}
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}