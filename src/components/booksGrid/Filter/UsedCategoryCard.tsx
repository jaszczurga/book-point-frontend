'use client';


type Props = {
    category: string;
}

export const UsedCategoryCard: React.FC<Props> = ({category}) => {




    return (
        <div
            key={category}
            className={"flex flex-row justify-center items-center  bg-blue-100 border border-blue-300 text-blue-500 px-4 py-2 rounded-md shadow-md"}
        >
            <p className={"text-sm"}>{category}</p>
        </div>
    )
}