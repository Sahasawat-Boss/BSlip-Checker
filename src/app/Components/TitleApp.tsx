'use client'

import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";

const TitleApp: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Toggle tooltip on click
    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    // Hide tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className="relative text-center animate-fade-in">
            {/* Gradient H1 */}
            <h1 className="text-4xl font-extrabold drop-shadow-lg text-gradient-blue-CSS relative inline-block ">
                BSlip-Checker

                {/* Info Icon */}
                <span className="relative inline-block ">
                    <FaInfoCircle
                        className="absolute top-0 right-[-30px] bg-white rounded-full text-gray-400 text-xl cursor-pointer hover:scale-125 transition opacity-70 "
                        onClick={togglePopup} // Show on click
                        onMouseEnter={() => setIsPopupOpen(true)} // Show on hover
                        aria-label="More Info"
                    />
                </span>
            </h1>

            {/* Floating Tooltip (Now Positioned at the Top of the Page) */}
            {isPopupOpen && (
                <div
                    ref={tooltipRef}
                    className="fixed top-36 left-1/2 -translate-x-1/2 w-80 bg-white text-gray-900 rounded-lg py-8 px-4 shadow-2xl text-base z-[100] transition-opacity duration-300 border border-gray-300">

                    {/* Tooltip Content */}
                    <p className="text-gray-900 font-semibold mb-2">BSlip-Checker</p>
                    <p className="text-gray-800">
                        เป็นเครื่องมือที่ช่วยตรวจสอบสลิปโอนเงินจาก QR Code
                        เพื่อยืนยันความถูกต้องของข้อมูลและป้องกันการปลอมแปลง
                    </p>
                </div>
            )}

            {/* Upload Slip Section (Now Tooltip Won't Overlap) */}
            <p className="mt-10 mb-2 text-xl font-bold text-center drop-shadow-lg text-gradient-blue-CSS">
                อัพโหลด Slip
            </p>
        </section>
    );
};

export default TitleApp;
