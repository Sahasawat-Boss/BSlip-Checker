"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa"; // React Icons for better UI

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle the menu
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-[#202b68] p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Image
                        src="/BS.png" // Replace with your logo path
                        alt="Logo"
                        width={45}
                        height={40}
                        className="mr-3 px-0.5 rounded-full"
                    />
                    <h1 className="text-white text-xl font-semibold">
                        Bslip-Checker
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-6">
                    <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
                    <a href="#about" className="text-white hover:text-gray-300 transition">About</a>
                    <a href="#contact" className="text-white hover:text-gray-300 transition">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white text-2xl focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu (Slide-in Effect) */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-blue-900 shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-white text-2xl"
                    aria-label="Close Menu"
                >
                    <FaTimes />
                </button>

                <div className="flex flex-col items-center mt-20 space-y-6">
                    <a href="#" className="text-white text-lg hover:text-gray-300 transition" onClick={toggleMenu}>Home</a>
                    <a href="#about" className="text-white text-lg hover:text-gray-300 transition" onClick={toggleMenu}>About</a>
                    <a href="#contact" className="text-white text-lg hover:text-gray-300 transition" onClick={toggleMenu}>Contact</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
