import {AddBookForm} from "@/components/addBookForm/addBookForm";
import {auth} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function Account() {
    const session = await auth();
    if(!session){
        redirect("/");
    }

  return (
    <div className="h-full flex justify-center">
        <AddBookForm session={session}/>
    </div>
  );
}


