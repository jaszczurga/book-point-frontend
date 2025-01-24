import {SearchIcon} from "@/components/icons/SearchIcon";
import {twMerge} from "tailwind-merge";

type Props = {
    setSearchQuery: (query: string) => void;
    className?: string;
}


export const Search: React.FC<Props> = ({setSearchQuery,className}) => {
    return (
        <div className={twMerge("w-full flex flex-row p-2 border bg-pureWhite border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",className)}>
            <input
                type="text"
                placeholder="Search"
                className="w-full focus:outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
        </div>
    )
}

