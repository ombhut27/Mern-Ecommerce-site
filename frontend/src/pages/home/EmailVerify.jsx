import React from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, getUserData } = useContext(AppContent);

  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

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
    const pastArray = paste.split("");
    pastArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(backendUrl + "/api/auth/verify-account", {
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] mt-6 bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-gray-800 text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Enter the 6-digit code sent to your email id
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-gray-100 text-gray-800 text-center text-xl rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;

