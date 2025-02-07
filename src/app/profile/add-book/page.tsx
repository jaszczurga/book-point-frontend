import {AddBookSection} from "@/components/addBookForm/AddBookSection";
import {auth} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";


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