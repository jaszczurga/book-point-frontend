'use client';
import {useState} from "react";

type Props = {
    text: string;
}

export const ShowMoreText: React.FC<Props> = ({text}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    return (
        <>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {showFullDescription || text.length <= 300
                    ? text
                    : `${text.substring(0, 300)}...`}
            </p>
            {text.length > 300 && (
                <button
                    className="text-blue-500 mt-2 focus:outline-none"
                    onClick={toggleDescription}
                >
                    {showFullDescription ? "Show Less" : "Show More"}
                </button>
            )}
        </>
    );
}