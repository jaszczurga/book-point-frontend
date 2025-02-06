import {Session} from "next-auth";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Loan} from "@/app/profile/page";
import ApiConfig from "@/lib/backendApi/apiConfiguration";


export const returnBook = async (url:string, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken);
    return await api.get<Loan>(url);
}
