import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "@auth/core/jwt";
import {NextAuthConfig, Session, User} from "next-auth";
import {AdapterSession} from "@auth/core/adapters";

export const authOptions: NextAuthConfig = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                console.log('Account: ', account)
                token.id_token = account.id_token
                token.provider = account.provider
            }
            return token
        },
        session({session}: { session: Session, token: JWT }) {
            console.log('session: ', session)
            return session
        },
        authorized: async ({auth}) => {
            return !!auth
        }
    },
    events: {
        async signOut(message: { session: void | AdapterSession | null | undefined; } | { token: JWT | null; }) {
            if ('token' in message && message.token) {
                console.log("logout action for token: ", message.token);
                await fetch(`http://localhost:8081/realms/book-point/protocol/openid-connect/logout?id_token_hint=${message.token.id_token}`);
            }
        },
        async signIn(message: {user: User}){
            console.log(`Sign in event, user: ${message.user.email}`)
            await fetch("http://localhost:8080/books?categories=t1")
        }
    }
}