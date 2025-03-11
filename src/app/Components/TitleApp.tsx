

const TitleApp: React.FC = () => {
    return (
        <section className="text-center mb-8">
            {/* Gradient H1 */}
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#23335c] to-[#3051d6] text-transparent bg-clip-text drop-shadow-lg animate-fadeIn">
                BSlip-Checker
            </h1>

            {/* Description Article */}
            <p className="mt-2 text-lg text-gray-800 max-w-lg mx-auto px-4">
                A modern and efficient way to verify bank transaction slips. Upload your slip and get real-time details with accuracy and security.
            </p>
        </section>
    );
};

export default TitleApp;
