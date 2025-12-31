import { Check, PartyPopper, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreationSuccess = ({ serviceId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-700">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
        <PartyPopper size={40} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">You're all set!</h1>
      <p className="text-gray-500 text-lg mb-10 max-w-md">
        Your service is now being processed. It will be live in the marketplace
        shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => navigate(`/service/${serviceId}`)}
          className="flex-1 bg-gray-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-black transition flex items-center justify-center gap-2"
        >
          View Service <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CreationSuccess;
