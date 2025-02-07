import {SearchIcon} from "@/components/icons/SearchIcon";
import {twMerge} from "tailwind-merge";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";

type Props = {
    defaultQuery?: string;
    setSearchQuery: (query: string) => void;
    search?: (query: string) => void;
    className?: string;
    placeholder?: string;
}


export const SearchBook: React.FC<Props> = ({setSearchQuery,search,className,placeholder="Search",defaultQuery}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('searchQuery', term);
        } else {
            params.delete('searchQuery');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={twMerge("w-full flex flex-row p-2 border bg-pureWhite border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",className)}>
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={defaultQuery}
                className="w-full focus:outline-none"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <SearchIcon />
        </div>
    )
}

