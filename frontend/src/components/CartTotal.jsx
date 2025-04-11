import { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, backendUrl } = useContext(AppContent);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(getCartAmount() + delivery_fee);
  const [couponApplied, setCouponApplied] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    // Fetch available coupons
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/coupon/list`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await response.json();
        if (data.success) {
          setAvailableCoupons(data.coupons);
        } else {
          toast.error('Failed to fetch coupons.');
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
        toast.error('Error fetching coupons.');
      }
    };

    fetchCoupons();
  }, [backendUrl]);

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.info('Please select a coupon.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/coupon/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: couponCode, cartTotal: getCartAmount() }),
      });

      const data = await response.json();

      if (data.success) {
        setDiscount(data.discountAmount);
        setFinalTotal(data.finalTotal + delivery_fee);
        setCouponApplied(true);
        toast.success('Coupon applied successfully!');
      } else {
        toast.error(data.message);
        setDiscount(0);
        setFinalTotal(getCartAmount() + delivery_fee);
        setCouponApplied(false);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('Error applying coupon.');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setFinalTotal(getCartAmount() + delivery_fee);
    setCouponCode('');
    setCouponApplied(false);
    toast.error('Coupon removed.');
  };

  return (
    <div className='w-full'>
      <div className='text-2xl mb-5'>
        <h2>CART TOTALS</h2>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        {discount > 0 && (
          <>
            <div className='flex justify-between text-green-600'>
              <p>Discount</p>
              <p>- {currency} {discount}.00</p>
            </div>
            <hr />
          </>
        )}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {finalTotal}.00</b>
        </div>
      </div>

      <div className='mt-4'>
        {!couponApplied ? (
          <>
            <select
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='border p-2 w-full'
            >
              <option value=''>Select a coupon</option>
              {availableCoupons.map((coupon) => (
                <option key={coupon._id} value={coupon.code}>
                  {coupon.code} - {coupon.discountValue}
                  {coupon.discountType === 'percentage' ? '%' : ` ${currency}`}
                </option>
              ))}
            </select>
            <button
              onClick={handleApplyCoupon}
              className='mt-2 bg-blue-500 text-white px-4 py-2 w-full rounded'
            >
              Apply Coupon
            </button>
          </>
        ) : (
          <button
            onClick={handleRemoveCoupon}
            className='mt-2 bg-red-500 text-white px-4 py-2 w-full rounded'
          >
            Remove Coupon
          </button>
        )}
      </div>
    </div>
  )
}

export default CartTotal


