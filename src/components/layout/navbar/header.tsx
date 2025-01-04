'use client'
import {HamburgerButton} from "@/components/layout/navbar/components/hamburger-button";
import {Logo} from "@/components/layout/navbar/components/logo";
import NavItem from "@/components/layout/navbar/components/nav-item";
import {useState} from "react";
import {usePathname} from "next/navigation";

interface NavItemData {
    href: string;
    label: string;
    isActive?: boolean;
}

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathName = usePathname();

    const navItems: NavItemData[] = [
        { href: '/home', label: 'Home' },
        { href: '/library', label: 'Library' },
        { href: '/profile', label: 'Profile' },
    ];

    return (
        <nav className="w-full bg-colorHeader shadow-navShadow">
            {/*<ScrollToMainButton/>*/}
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo/>
                <HamburgerButton setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="font-medium flex flex-col md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
                        {navItems.map((item) => (
                            <NavItem key={item.label} href={item.href} label={item.label}
                                     isActive={pathName === item.href}/>
                        ))}
                        {/*<AuthButton session={session}/>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
}