import React, { useEffect, useState } from "react";
import { getMyDisputes, cancelMyDispute } from "../../../../api/clientUserApis";
import DynamicTable from "../../DynamicTable";
import ActionMenu from "../../ActionMenu";

export default function ClientDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const res = await getMyDisputes();
      // الوصول للمصفوفة داخل res.data حسب الـ Swagger
      // documentation says the array is inside res.data according to Swagger
      setDisputes(res.data || []);
    } catch (err) {
      console.error("Failed to load your disputes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this dispute?")) {
      await cancelMyDispute(id);
      fetchDisputes(); // تحديث الجدول
    }
  };

  const columns = [
    { key: "id", label: "Dispute ID" },
    { key: "orderId", label: "Order ID" },
    { key: "reason", label: "Reason" },
    { 
      key: "status", 
      label: "Status",
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'open' ? 'bg-yellow-100 text-yellow-700' : 
          row.status === 'cancelled' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: "actions",
      label: "Options",
      render: (row) => (
        <ActionMenu
          actions={[
            { label: "View Progress", onClick: () => console.log("Details for", row.id) },
            // الزر يظهر فقط إذا كان النزاع لا يزال مفتوحاً
            ...(row.status === 'open' ? [{ 
              label: "Cancel Dispute", 
              danger: true, 
              onClick: () => handleCancel(row.id) 
            }] : []),
          ]}
        />
      ),
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">My Disputes</h1>
        <p className="text-slate-500">Track and manage your submitted claims.</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-400 font-medium">Loading your records...</p>
        </div>
      ) : disputes.length > 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <DynamicTable columns={columns} data={disputes} />
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 italic">You haven't opened any disputes yet.</p>
        </div>
      )}
    </div>
  );
}