import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CreateCoupon = () => {
  // Generate Auto coupon code
  const generateCouponCode = () => {
    const prefix = "Save";
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const number = Math.floor(Math.random() * 90 + 10);
    return `${prefix}${number}-${random}`;
  };

  const [coupon, setCoupon] = useState({
    coupon_code: generateCouponCode,
    discount_rate: "",
    expDate: "",
    ProviderId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/coupon",
        coupon
      );
      toast.success("Coupon Card created  successfully");
      setCoupon(response);
    } catch (error) {
      console.error("Failed created the coupon card, Try Again!!", error);
      toast.error("Failed created the coupon card, Try Again!!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-blue-500 ">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Create Coupon
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Auto Coupon  Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Coupon Code
          </label>
          <input
            type="text"
            name="coupon_code"
            value={coupon.coupon_code}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        {/* Discount rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Discount Rate %
          </label>
          <input
            type="number"
            value={coupon.discount_rate}
            name="discount_rate"
            onChange={handleChange}
            placeholder="e.g 20"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        {/* Exp Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Expiration Date
          </label>
          <input
            type="date"
            name="expDate"
            value={coupon.expDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          ></input>
        </div>
        {/* Provider Id */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Provider Name
          </label>
          <input
            type="text"
            name="ProviderId"
            value={coupon.ProviderId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 "
            required
          ></input>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
