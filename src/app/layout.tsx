import type { Metadata } from "next";
import "./globals.css";
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
        <html lang="en" suppressHydrationWarning>
        <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
