import {twMerge} from "tailwind-merge";

type Props = {
    children: React.ReactNode;
    className?: string;
}

export const FilterList: React.FC<Props> = ({children,className}) => {

    return (
        <div className={twMerge(`flex flex-col`,className)}>
            {children}
        </div>
    )

}