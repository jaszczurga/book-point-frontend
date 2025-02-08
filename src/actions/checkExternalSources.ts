import {Session} from "next-auth";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import {Source} from "@/components/BookDetails/BookDetails";


export const checkExternalSources = async (url:string, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken, '');
    return await api.get<Source[]>(url);
}

export interface ExternalSourcesResponse {
    universityOfGdansk: number;
}