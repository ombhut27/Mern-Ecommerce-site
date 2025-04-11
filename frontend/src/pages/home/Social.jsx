const Social = () => {
    return (
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 mt-10">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-16 space-y-8 md:space-y-0 py-12">
                {/* Left Section: Single Image */}
                <div className="w-full md:w-1/2 max-w-lg">
                    <img
                        src="/social.jpg"
                        alt="Social Media"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>

                {/* Right Section: Text with Social Icons */}
                <div className="w-full md:w-1/2 max-w-lg text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Follow Us</h2>
                    <p className="text-gray-600 mb-6 text-base sm:text-lg">
                        Unlock the world of style—follow us on social media for behind-the-scenes sneak peeks, exclusive collections, and exciting surprises just for you!
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start space-x-8 text-2xl text-gray-700">
                        <i className="ri-instagram-line cursor-pointer hover:text-pink-500"></i>
                        <i className="ri-facebook-circle-fill cursor-pointer hover:text-blue-600"></i>
                        <i className="ri-twitter-x-line cursor-pointer hover:text-blue-400"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Social;





