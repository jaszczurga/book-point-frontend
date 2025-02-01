import {Session} from "next-auth";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";


export const checkExternalSources = async (url:string, session?: Session) => {
    const api = new FetchWrapper(session?.accessToken, '');
    return await api.get<ExternalSourcesResponse>(url);
}

export interface ExternalSourcesResponse {
    universityOfGdansk: number;
}