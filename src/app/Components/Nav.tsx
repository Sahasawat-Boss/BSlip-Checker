'use client'

import React, { useState } from 'react';
import Image from 'next/image';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle the menu
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-[#202b68] p-4 flex justify-between items-center shadow-lg">
            {/* Logo Section */}
            <div className="flex items-center">
                <Image
                    src="/BSynth01.jpg" // Replace with your logo path
                    alt="Logo"
                    width={40}
                    height={40}
                    className="mr-3 px-0.5 rounded-lg"
                />
                <h1 className="text-white text-xl font-semibold">Bslip-Checker</h1>
            </div>

            {/* Hamburger Icon */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-white">
                    {menuOpen ? (
                        <span className="text-3xl">&times;</span> // Close icon
                    ) : (
                        <span className="text-3xl">&#9776;</span> // Hamburger icon
                    )}
                </button>
            </div>

            {/* Menu for large screens */}
            <div className="hidden lg:flex space-x-6">
                <a href="#" className="text-white">Home</a>
                <a href="#about" className="text-white">About</a>
                <a href="#contact" className="text-white">Contact</a>
            </div>

            {/* Dropdown menu for small screens */}
            {menuOpen && (
                <div className=" lg:hidden absolute top-16 right-0 bg-blue-800 p-4 w-48 space-y-4 rounded-md">
                    <a href="#" className="text-white block">Home</a>
                    <a href="#about" className="text-white block">About</a>
                    <a href="#contact" className="text-white block">Contact</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
