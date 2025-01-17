
type Props = {
    children: React.ReactNode;
}

export const Card: React.FC<Props> = ({children}) => {
    return (
        <div className="shadow-lg rounded-lg bg-white border border-gray-200">
            <div className="flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}