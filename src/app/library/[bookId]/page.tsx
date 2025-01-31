
export default async function Page({params}: {params: Promise<{bookId: string}>}) {

    const { bookId } = await params;

    return (
        <div>
            <h1>Book ID: {bookId}</h1>
        </div>
    )
}