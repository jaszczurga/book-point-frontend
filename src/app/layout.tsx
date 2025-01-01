import type { Metadata } from "next";
import "./globals.css";
import {AuthProvider} from "@/app/providers";
import {Header} from "@/components/header";

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
        <html lang="en" suppressHydrationWarning>
        <body>
        <AuthProvider>
            <Header/>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
