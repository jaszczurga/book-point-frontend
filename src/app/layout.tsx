import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/layout/navbar/header";

export const metadata: Metadata = {
  title: "Book Point",
  description: "App to find books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={"bg-pureWhite text-pureWhite"}>
        {/*<AuthProvider>*/}
            <Header/>
            {children}
        {/*</AuthProvider>*/}
        </body>
        </html>
    );
}
