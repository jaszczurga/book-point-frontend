import React from 'react';
import Link from "next/link";

interface NavItemProps {
    href: string;
    label: string;
    isActive?: boolean;
    onClick?: () => void; // Optional onClick prop
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive = false, onClick }) => {
    const baseClasses = "block py-2 md:p-1 ";
    const activeClasses = isActive ? "text-pureWhite" : "text-pureWhite";
    const hoverClasses = "hover:text-pureWhite";
    const animationClasses = `
        before:absolute before:bg-pureWhite
        md:before:h-[3px] before:h-[95%] ${isActive ? "md:before:w-[100%] before:w-[3px]" : "md:before:w-0 before:w-0"} md:hover:before:w-[100%] hover:before:w-[3px] md:hover:before:h-[3px]  before:top-0 before:left-[-16px] md:before:left-0 md:before:top-[45px]
    `;

    return (
        <li className="relative">
            <Link
                href={href}
                className={`${baseClasses} ${activeClasses} ${hoverClasses} ${animationClasses}`}
                aria-current={isActive ? "page" : undefined}
                onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
            >
                {label}
            </Link>
        </li>
    );
};

export default NavItem;
