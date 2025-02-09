import { BookIcon } from "@/components/icons/BookIcon";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-center items-center px-6 text-center space-y-6 bg-white py-10">
            <h1 className="text-5xl font-bold text-colorHeader">Welcome to BookPoint</h1>

            <div className="max-w-2xl p-6 rounded-2xl">
                <div className="space-y-4 text-lg text-gray-700">
                    <p>
                        <strong>BookPoint</strong> is a modern <strong>web application</strong> designed for university students.
                        It allows them to easily <strong>exchange and borrow used books</strong> within their academic community.
                    </p>

                    <div className="flex flex-row justify-center items-center space-x-3">
                        <BookIcon className="w-10 h-10 text-pureWhite" />
                        <strong className="text-xl">Key Features:</strong>
                    </div>

                    <ul className="space-y-2 text-left text-center">
                        <li>✅ <strong>Add</strong> your used books to the database.</li>
                        <li>📚 <strong>Browse</strong> available books from other students.</li>
                        <li>🔄 <strong>Borrow</strong> books in a simple and convenient way.</li>
                        <li>🔎 <strong>Check</strong> university resources</li>
                    </ul>

                    <p>
                        BookPoint promotes a <strong className="text-green-500">sustainable</strong> and
                        <strong className="text-blue-500"> budget-friendly</strong> approach to accessing academic resources,
                        making studying more <strong className="text-yellow-500">affordable</strong> and <strong className="text-purple-500">efficient</strong>! 🚀
                    </p>

                    <div>
                        <Link
                            data-testid="continue-button"
                            className="bg-green-500 text-white p-2 rounded-md"
                            href="/library"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}