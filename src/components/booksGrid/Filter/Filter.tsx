'use client'
import {useState} from "react";
import {ArrowDown} from "@/components/icons/ArrowDown";
import {ArrowUp} from "@/components/icons/ArrowUp";

type Props = {
    categories: string[];
}

export const Filter: React.FC<Props> = ({categories}) => {

   const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className="text-colorHeader bg-pureWhite font-medium text-sm px-4 py-2.5 text-center inline-flex items-center justify-between w-full cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                Filter by category
                {open ? <ArrowUp /> : <ArrowDown />}
            </div>
            <div
                className={`z-10 w-full p-3 transition-all duration-300 ${
                    open ? "block" : "hidden"
                }`}
            >
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-pureWhite text-colorHeader "
                        />
                        <label
                            className="ml-2 text-sm font-medium"
                        >
                            Razor (49)
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}