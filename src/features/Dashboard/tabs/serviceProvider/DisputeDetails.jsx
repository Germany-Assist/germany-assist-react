import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../api/client";
import { ArrowLeft, Gavel, Calendar, Hash } from "lucide-react";
import LoadingIcon from "../../../../components/ui/LoadingIcon";
import { getErrorMessage } from "../../../../api/errorMessages";

export default function DisputeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dispute, setDispute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const fetchDisputeData = async () => {
            try {
                // return all disputes for the current user
                const res = await api.get(`/dispute`);
                // return the dispute with the matching ID that belongs to the current user
                const currentDispute = res.data.data.find(d => String(d.id) === String(id));

                if (currentDispute) {
                    setDispute(currentDispute);
                }
            } catch (err) {
                console.error("Error loading dispute details");
            } finally {
                setLoading(false);
            }
        };
        fetchDisputeData();
    }, [id]);

    const handleResponse = async () => {
        const responseText = window.prompt("Enter your response to this dispute:");

        if (!responseText) return;

        setIsSubmitting(true);
        try {
            // POST /dispute/provider/response/{id}  d
            await api.post(`/dispute/provider/response/${id}`, {
                response: responseText
            });

            alert("Response submitted successfully!");
           // update the data after respond
            window.location.reload();
        } catch (error) {
            alert(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><LoadingIcon /></div>;
    if (!dispute) return <div className="p-10 text-center text-red-500 font-bold">Dispute Not Found</div>;

   return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
        <ArrowLeft size={14} /> Back to Center
      </button>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50">
        {/* Header Section */}
        <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50/50 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
              <Gavel size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Dispute Details</h1>
              <p className="text-zinc-500 text-xs font-medium tracking-wide">Managing Claim #{dispute.id}</p>
            </div>
          </div>
          
          {/* هنا الـ Status Badge الواحد الصحيح */}
          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
            dispute.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
            dispute.status === 'cancelled' ? 'bg-zinc-100 text-zinc-500' :
            dispute.status === 'in_review' ? 'bg-blue-100 text-blue-700' :
            'bg-green-100 text-green-700'
          }`}>
            {dispute.status.replace('_', ' ')}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Hash className="text-zinc-400 mt-1" size={16} />
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Related Order ID</p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{dispute.orderId}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-zinc-400 mt-1" size={16} />
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Reason for Claim</p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{dispute.reason}</p>
              </div>
            </div>

            {/* زر الرد يظهر هنا تحت البيانات الأساسية */}
            {dispute.status === 'open' && (
              <button
                disabled={isSubmitting}
                onClick={handleResponse}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:bg-zinc-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </button>
            )}
          </div>

          <div className="bg-zinc-50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-100 dark:border-white/5">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 italic">Message from Client</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {dispute.description || "No additional details provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
