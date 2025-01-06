import React from "react";
import {signIn, signOut} from "next-auth/react";
import NavItem from "@/components/layout/navbar/components/nav-item";
import {Session} from "next-auth";

type Props = {
    session: Session | null;
}

const AuthButton: React.FC<Props> = ({session}) => {

    const handleLogout = async () => {
        await signOut();
    };

    const handleLogin = async () => {
        await signIn("keycloak");
    }

    if (!session) {
        return (
            <NavItem
                href="#"
                label="Login"
                onClick={handleLogin}
            />
        );
    }
    return (
        <NavItem
            href="#"
            label="Logout"
            onClick={handleLogout}
        />
    );
};

export default AuthButton;
