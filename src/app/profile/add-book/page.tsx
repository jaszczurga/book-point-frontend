import {AddBookSection} from "@/components/addBookForm/AddBookSection";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";



export default async function Page() {

    const session = await auth();
    if (!session) {
        redirect("/");
    }

    return (
      <div >
            <div className="h-full flex flex-col ">
                <AddBookSection session={session}/>
            </div>
      </div>
    );
}