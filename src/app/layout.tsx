import
    type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/layout/navbar/header";
import {AuthProvider} from "@/app/providers";

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
        <body className={"bg-pureWhite text-black"}>
        <AuthProvider>
            <Header/>
            <div className={"md:mx-36 sm:mx-20 mx-8"}>
                {children}
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}
