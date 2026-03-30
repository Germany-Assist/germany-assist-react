import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, Send, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { api } from "../../../../api/client"; 

/**
 * SPDisputeResponse Component
 * Allows Service Providers to submit a formal counter-claim or response 
 * to an open dispute. Includes a summary of the buyer's original claim.
 */
const SPDisputeResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // --- State Management ---
  const [dispute, setDispute] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Fetches the specific dispute details on mount.
   * Note: In a production environment, a specific GET /dispute/:id endpoint is recommended.
   */
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/dispute`); 
        // Locate the specific dispute from the returned list
        const current = res.data.find(d => d.id === parseInt(id));
        setDispute(current);
      } catch (err) {
        console.error("Error fetching dispute detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  /**
   * Submits the provider's statement to the arbitration API.
   * Prevents empty submissions and manages submission state.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response.trim()) return;

    setSubmitting(true);
    try {
      // POST the response to the provider-specific resolution endpoint
      await api.post(`/dispute/provider/response/${id}`, {
        response: response
      });
      
      alert("Response submitted successfully!");
      navigate("/provider/disputes"); // Return to main dashboard list
    } catch (err) {
      console.error("Failed to submit response:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Initial Loading Screen ---
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
      <Loader2 className="animate-spin text-zinc-700" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
      {/* Navigation: Return to the previous dashboard view */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Back to Disputes
      </button>

      {/* Header Section */}
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
          SUBMIT RESPONSE
        </h1>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
          Address the claim for Dispute #{id}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar: Buyer's Claim Summary (Contextual Reminder) */}
        <div className="col-span-1 space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[2rem]">
            <ShieldAlert className="text-red-500 mb-4" size={32} />
            <h3 className="text-xs font-black uppercase text-red-500 mb-2">Buyer's Claim</h3>
            <p className="text-sm text-zinc-400 italic">
              "{dispute?.reason || "No specific reason provided"}"
            </p>
          </div>
        </div>

        {/* Main Response Form */}
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your official response here..."
                className="w-full h-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all resize-none shadow-inner"
                required
              />
              <div className="absolute bottom-6 right-8 text-[10px] font-bold text-zinc-600 uppercase">
                Official Statement
              </div>
            </div>

            {/* Submission CTA */}
            <button
              type="submit"
              disabled={submitting || !response.trim()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Send size={16} />
              )}
              Submit Resolution Response
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SPDisputeResponse;