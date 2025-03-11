'use client'

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-[#1E2A47] to-[#374785] text-white py-5 text-center relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">

                {/* BSynth Logo */}
                <Image
                    src="/BS.png" // Replace with your actual logo path
                    alt="BSynth Logo"
                    width={35}
                    height={35}
                    className="rounded-full"
                />

                {/* Copyright */}
                <p className="text-gray-400 text-base">
                    © {new Date().getFullYear()} BSynth. All rights reserved.
                </p>

                {/* GitHub Link */}
                <a
                    href="https://github.com/Sahasawat-Boss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition flex items-center gap-2"
                >
                    <FaGithub className="text-2xl" />
                    <span className="text-lg">GitHub</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
