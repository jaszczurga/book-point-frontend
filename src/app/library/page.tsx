import {auth} from "@/app/api/auth/[...nextauth]/route";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";


export default async function Books() {

    const session = await auth();

    return (
      <div className="h-full flex justify-center items-center">
          <p className={"text-black"}>{session?.accessToken}</p>
      </div>
    );
}