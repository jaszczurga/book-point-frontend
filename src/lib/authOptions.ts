import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "@auth/core/jwt";
import {NextAuthConfig, Session} from "next-auth";
import {AdapterSession} from "@auth/core/adapters";
import FetchWrapper from "@/lib/backendApi/fetchWrapper";
import ApiConfig from "@/lib/backendApi/apiConfiguration";

declare module "next-auth" {
    interface Session {
        accessToken: string;
    }
}

export const authOptions: NextAuthConfig = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
    callbacks: {
        async jwt({token,user, account}) {
            if (account) {
                const api = new FetchWrapper(account.access_token ?? '');
                const userToValidate: ValidateUserReq = {
                    email: user.email as string,
                    firstname: user.name as string,
                    lastname: user.name as string
                }
                // console.log('JWT-> User to validate: ', userToValidate)
                // console.log('JWT-> Token: ', token)
                await api.post<ValidateUserRes,ValidateUserReq>(`${ApiConfig.Endpoints.Auth.Validate}`,userToValidate);
            }

            return {
                ...token,
                ...user,
                ...account
            }
        },
        session({session, token}: { session: Session, token: JWT }) {
            // console.log("SESSION-> TOKEN: ", token)
            if(token){
                session.accessToken = token.access_token as string;
            }
            // console.log('session: ', session)
            return session
        },
        authorized: async ({auth}) => {
            return !!auth
        }
    },
    events: {
        async signOut(message: { session: void | AdapterSession | null | undefined; } | { token: JWT | null; }) {
            if ('token' in message && message.token) {
                // console.log("logout action for token: ", message.token);
                await fetch(`http://localhost:8081/realms/book-point/protocol/openid-connect/logout?id_token_hint=${message.token.id_token}`);
            }
        }
    }
}

type ValidateUserReq = {
    email: string;
    firstname: string;
    lastname: string;
}

type ValidateUserRes = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
}