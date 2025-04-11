import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className='mx-5 md:mx-20 mb-20'>
      <hr className="border-t border-gray-300 my-6" />
      <div className='text-center text-2xl pt-5 '>

        <h2>CONTACT US</h2>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start mb-20'>
        <img className='w-full max-w-[350px] md:max-w-[480px] object-cover' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-center md:items-start gap-4 md:gap-6 text-center md:text-left'>
          <p className='font-semibold text-lg md:text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500 text-sm md:text-base'>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className='text-gray-500 text-sm md:text-base'>
            Tel: (415) 555-0132 <br /> Email: admin@Wear4u.com
          </p>
          <p className='font-semibold text-lg md:text-xl text-gray-600'>About Us</p>
          <Link to='/about'><button className='border border-black px-6 py-3 md:px-8 md:py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore About Us
          </button></Link>

        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
