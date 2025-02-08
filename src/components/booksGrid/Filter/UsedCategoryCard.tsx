'use client';
import {CloseIcon} from "@/components/icons/CloseIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {revalidatePath} from "next/cache";


type Props = {
    category: string;
}

export const UsedCategoryCard: React.FC<Props> = ({category}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleCloseCategory() {
        const params = new URLSearchParams(searchParams);
        const existingCategories = params.get('categories')?.split(',') || [];
        params.delete('page');
        const updatedCategories = existingCategories.filter(cat => cat !== category);
        updatedCategories.length > 0
            ? params.set('categories', updatedCategories.join(','))
            : params.delete('categories');
        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    return (
        <div
            key={category}
            className={"flex flex-row justify-center items-center  bg-blue-100 border border-blue-300 text-blue-500 px-4 py-2 rounded-md shadow-md"}
        >
            <p className={"text-sm"}>{category}</p>
            <div
            onClick={handleCloseCategory}
            >
                <CloseIcon className={"text-blue-500 ml-3"}/>
            </div>
        </div>
    )
}