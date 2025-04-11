import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className='mx-5 md:mx-20 mb-20'>
       <hr className="border-t border-gray-300 my-6" />
      <div className='text-2xl text-center pt-5'>
        <h2>ABOUT US</h2>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center'>
        <img className='w-full max-w-[400px] md:max-w-[450px] object-cover' src={assets.about_img} alt="About Us" />
        <div className='flex flex-col justify-center gap-4 md:gap-6 md:w-2/4 text-gray-600 text-sm md:text-base'>
          <p>Wear4u was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we have worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Wear4u is to empower customers with choice, convenience, and confidence. We are dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4 text-center md:text-left'>
        <h2>WHY CHOOSE US</h2>
      </div>

      <div className='flex flex-col md:flex-row text-sm gap-4 md:gap-0 mb-20'>
        <div className='border px-6 md:px-10 py-6 md:py-16 flex flex-col gap-3 md:gap-5 items-center md:items-start text-center md:text-left'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-6 md:px-10 py-6 md:py-16 flex flex-col gap-3 md:gap-5 items-center md:items-start text-center md:text-left'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-6 md:px-10 py-6 md:py-16 flex flex-col gap-3 md:gap-5 items-center md:items-start text-center md:text-left'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
