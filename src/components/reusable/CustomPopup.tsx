'use client';
import { useEffect } from "react";
import {twMerge} from "tailwind-merge";

type Props = {
    message: string;
    onClose: () => void;
    className?: string;
};

export const CustomPopup: React.FC<Props> = ({ message, onClose,className }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={twMerge("fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-auto bg-red-500 p-4 rounded-lg shadow-lg flex justify-center items-center",className)}
        >
            <p className="text-white font-semibold">{message}</p>
        </div>
    );
};
