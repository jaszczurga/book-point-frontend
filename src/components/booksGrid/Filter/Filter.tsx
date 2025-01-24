'use client'
import {useEffect, useState} from "react";
import {ArrowDown} from "@/components/icons/ArrowDown";
import {ArrowUp} from "@/components/icons/ArrowUp";
import {Category, CategoryFull} from "@/components/addBookForm/addBookForm";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";

type Props = {
    category: CategoryFull;
    toggleCategory: (categoryName: string) => void;
}

export const Filter: React.FC<Props> = ({category, toggleCategory}) => {

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
                                    className="w-4 h-4 mx-2 bg-pureWhite text-colorHeader "
                                    onChange={() => toggleCategory(category.name)}
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