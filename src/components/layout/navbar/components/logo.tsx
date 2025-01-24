import React from "react";
import Link from "next/link";
import {LogoIcon} from "@/components/icons/Logo";


export const Logo = () => {
    return (
        <Link href="/home" className="flex items-center space-x-3 text-pureWhite">
            <LogoIcon/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">BookPoint</span>
        </Link>
    )
}