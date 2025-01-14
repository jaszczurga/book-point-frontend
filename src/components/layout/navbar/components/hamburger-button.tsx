import React from "react";

interface HamburgerProps {
    setIsMenuOpen: (isOpen: boolean) => void;
    isMenuOpen: boolean;
}

export const HamburgerButton: React.FC<HamburgerProps> = ({ setIsMenuOpen, isMenuOpen }) => {
    return (
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-textColor rounded-lg md:hidden hover:text-secondary hover:outline-none hover:ring-2 hover:ring-secondary"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
        >
            <span className="sr-only">Toggle main menu</span>
            {isMenuOpen ? (
                // "X" icon for close state
                <svg className="w-5 h-5 text-pureWhite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                // Hamburger icon for open state
                <svg className="w-5 h-5 text-pureWhite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            )}
        </button>
    );
};
