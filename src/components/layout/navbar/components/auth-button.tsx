// import React from "react";
// import NavItem from "@/components/navbar/components/nav-item";
// import {signIn, signOut} from "next-auth/react";
//
// type Props = {
//     session: any;
// }
//
// const AuthButton: React.FC<Props> = ({session}) => {
//
//     const handleLogout = async () => {
//         await signOut();
//     };
//
//     const handleLogin = async () => {
//         await signIn("keycloak");
//     }
//
//     if (!session) {
//         return (
//             <NavItem
//                 href="#"
//                 label="Login"
//                 onClick={handleLogin}
//             />
//         );
//     }
//     return (
//         <NavItem
//             href="#"
//             label="Logout"
//             onClick={handleLogout}
//         />
//     );
// };
//
// export default AuthButton;
