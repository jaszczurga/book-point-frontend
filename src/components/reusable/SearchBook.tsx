'use client';
import {SearchIcon} from "@/components/icons/SearchIcon";
import {twMerge} from "tailwind-merge";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

type Props = {
    defaultQuery?: string;
    className?: string;
    placeholder?: string;
}


export const SearchBook: React.FC<Props> = ({className,placeholder="Search",defaultQuery}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if (term) {
            params.set('searchQuery', term);
        } else {
            params.delete('searchQuery');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

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

