import { useState, useEffect, useRef, useContext } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [timer, setTimer] = useState(0); 
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (isEmailSent && !isOtpExpired) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsOtpExpired(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isEmailSent, isOtpExpired]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);

        // Calculate the remaining time dynamically
        const currentTime = Date.now();
        const remainingTime = Math.max(Math.floor((new Date(data.otpExpireAt) - currentTime) / 1000), 0);

        setTimer(remainingTime);
        setIsEmailSent(true);
        setIsOtpExpired(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onResendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);

        // Calculate the remaining time dynamically
        const currentTime = Date.now();
        const remainingTime = Math.max(Math.floor((new Date(data.otpExpireAt) - currentTime) / 1000), 0);

        setTimer(remainingTime);
        setIsOtpExpired(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    setOtp(otp);

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-reset-password-otp`, { email, otp });
      if (data.success) {
        setIsOtpSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] mt-6 bg-gray-100 p-4">
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-gray-800 text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-gray-600">Enter your registered email address</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg border border-gray-300 bg-gray-50">
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
              placeholder="Email ID"
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>
          <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Submit
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-gray-800 text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-gray-600">Enter the 6-digit code sent to your email ID</p>

          <div className="flex justify-between mb-4" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 border border-gray-300 bg-gray-50 text-gray-800 text-center text-xl rounded-lg"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>

          <div>
            {!isOtpExpired ? (
              <>
                <p className="text-center text-sm text-gray-500 mb-4">OTP expires in: {formatTime(timer)}</p>
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Submit
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onResendOtp}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-4"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-gray-800 text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-gray-600">Enter the new password below</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg border border-gray-300 bg-gray-50">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              required
              type="password"
              value={newPassword}
              placeholder="Password"
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>
          <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;



