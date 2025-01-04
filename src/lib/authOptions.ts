import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "@auth/core/jwt";
import {NextAuthConfig, Session} from "next-auth";
import {AdapterSession} from "@auth/core/adapters";

declare module "next-auth" {
    interface User {
        role: string;
    }
}


export const authOptions: NextAuthConfig = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER,
            profile(profile) {
                console.log('Profile: ', profile);
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    role: profile.roles[0]
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account,user }) {
            if (account) {
                console.log('Account: ', account)
                token.id_token = account.id_token
                token.provider = account.provider
                token.role = user.role
            }
            return token
        },
        session({session, token}: { session: Session, token: JWT }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
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
                await fetch(`http://localhost:8081/realms/bakery-app/protocol/openid-connect/logout?id_token_hint=${message.token.id_token}`);
            }
        }
    }
}