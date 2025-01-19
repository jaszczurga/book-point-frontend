'use client'
import {useState} from "react";
import {ArrowDown} from "@/components/icons/ArrowDown";
import {ArrowUp} from "@/components/icons/ArrowUp";


export const Filter = () => {

   const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center justify-center">
            <div id="dropdownDefault" data-dropdown-toggle="dropdown"
                    className="text-colorHeader bg-pureWhite font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center justify-between w-full "
                    onClick={() => setOpen(!open)}
            >
                Filter by category
                {
                    open ? <ArrowUp/> : <ArrowDown/>
                }
            </div>

            <div id="dropdown" className="z-10 hidden w-56 p-3 bg-red rounded-lg shadow dark:bg-gray-700">
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                    <li className="flex items-center">
                        <input id="razor" type="checkbox" value=""
                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>

                        <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                            Razor (49)
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}