'use client'

import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const TitleApp: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <section className="relative text-center mb-8">
            {/* Gradient H1 */}
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#23335c] to-[#3051d6] text-transparent bg-clip-text drop-shadow-lg relative inline-block">
                BSlip-Checker

                {/* Info Icon + Tooltip Container */}
                <span className="relative inline-block">
                    <FaInfoCircle
                        className="absolute -top-2 -right-8 bg-white rounded-full text-yellow-500 text-xl cursor-pointer hover:scale-125 transition"
                        onMouseEnter={() => setIsPopupOpen(true)}
                        onMouseLeave={() => setIsPopupOpen(false)}
                        aria-label="More Info"
                    />

                    {/* Floating Tooltip */}
                    {isPopupOpen && (
                        <div className="absolute -top-0 right-0 w-72 bg-white text-gray-800 rounded-lg p-3 shadow-lg text-sm z-50 transition-opacity duration-300">

                            {/* Tooltip Content */}
                            <p className="text-gray-700 font-semibold">BSlip-Checker</p>
                            <p className="text-gray-600">
                                เป็นเครื่องมือที่ช่วยตรวจสอบสลิปโอนเงินจาก QR Code
                                เพื่อยืนยันความถูกต้องของข้อมูลและป้องกันการปลอมแปลง
                            </p>
                        </div>
                    )}
                </span>
            </h1>
        </section>
    );
};

export default TitleApp;
