import { twMerge } from 'tailwind-merge';
type Props = {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<Props> = ({children, className}) => {
    return (
        <div className={twMerge("shadow-lg rounded-lg bg-white border border-gray-200",className)}>
            <div className="flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}