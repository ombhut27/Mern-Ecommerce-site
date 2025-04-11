import { useState, useEffect } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/banner4.png", 
            heading: "Welcome to Our Store",
            text: "Discover the best products curated just for you.",
            buttonText: "Shop Now",
        },
        {
            image: "/banner3.png", 
            heading: "Explore Our New Arrivals",
            text: "Find the latest trends and styles today.",
            buttonText: "Discover Now",
        },
    ];

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
        });
    }, );

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(interval);
    }, );

    return (
        <div
            className="relative h-[350px] sm:h-[600px] overflow-hidden mt-5 bg-cover bg-center"
            style={{
                backgroundImage: `url(/background1.jpg)`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentSlide
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-90 z-0"
                        }`}
                    style={{ willChange: "opacity, transform" }}
                >
                    {/* Slide content */}
                    <div className="relative z-20 max-w-6xl mx-auto flex items-center justify-between h-full px-4 sm:px-6">
                        {/* Text Section */}
                        <div className="flex flex-col justify-center max-w-md text-left">
                            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2 sm:mb-4 text-red-600">
                                {slide.heading}
                            </h1>
                            <p className="text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6 text-black">
                                {slide.text}
                            </p>
                            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-1 px-4 sm:py-3 sm:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-base">
                                {slide.buttonText}
                            </button>

                        </div>

                        {/* Image Section */}
                        <div className="flex-shrink-0 w-[60%] sm:w-[40%] ml-2 sm:ml-4">
                            <img
                                src={slide.image}
                                alt={slide.heading}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows - Hidden on Mobile */}
            <button
                onClick={handlePrev}
                className="hidden sm:block absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 text-black p-1 sm:p-2 rounded-full z-30"
            >
                <i className="ri-arrow-left-wide-fill text-2xl sm:text-3xl"></i>
            </button>
            <button
                onClick={handleNext}
                className="hidden sm:block absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 text-black p-1 sm:p-2 rounded-full z-30"
            >
                <i className="ri-arrow-right-wide-fill text-2xl sm:text-3xl"></i>
            </button>

            {/* Slider Bar (Only on Mobile) */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:hidden z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer focus:outline-none transition-all duration-300 ${index === currentSlide ? "bg-red-600 scale-110" : "bg-gray-400"
                            }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;









