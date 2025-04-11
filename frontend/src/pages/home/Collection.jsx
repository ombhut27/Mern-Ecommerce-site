const Collection = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      {/* First Section - Text Left, Image Right */}
      <div className="flex flex-row items-center justify-between bg-white p-6 md:p-8 relative">
        {/* Text (Left) */}
        <div className="w-1/2 text-left">
          <h1 className="text-lg md:text-4xl font-bold text-black mb-2 mt-0 leading-snug">
            Clothing<br />Collections 2030
          </h1>
          <button className="text-black mt-1 tracking-wider hover:border-black focus:border-black relative group">
            SHOP NOW
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform group-hover:w-1/2 group-focus:w-1/2 transition-all duration-300"></span>
          </button>

        </div>

        {/* Image (Right) */}
        <div className="w-1/2 flex justify-center">
          <img
            src="/featured2.jpg"
            alt="Fashion Image"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Second Section - Image Left, Text Right */}
      <div className="flex flex-row items-center justify-between bg-white p-6 md:p-8 relative">
        {/* Image (Left) */}
        <div className="w-1/2 flex justify-center">
          <img
            src="/featured1.jpg"
            alt="Fashion Image"
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Text (Right) */}
        <div className="w-1/2 text-right">
          <h1 className="text-lg md:text-4xl font-bold text-black mb-2 mt-0 leading-snug">
            New Season<br />Arrivals 2023
          </h1>
          <button className="text-black mt-1 tracking-wider hover:border-black focus:border-black relative group">
            SHOP NOW
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform group-hover:w-1/2 group-focus:w-1/2 transition-all duration-300"></span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Collection;











