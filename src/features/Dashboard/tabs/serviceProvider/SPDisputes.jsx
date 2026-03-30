import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Timer,
  Loader2,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { 
  serviceProviderFinanceInit 
} from "../../../../api/serviceProviderApis";
import { api } from "../../../../api/client"; // لاستدعاء نزاعات اليوزر الحالي
import MetricCard from "../../../../components/ui/dashboard/MetricCard";
import DisputesTable from "../../DisputesTable"; // تأكد من المسار الصحيح للجدول الموحد

const SPDisputes = () => {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState([]);
  const [metrics, setMetrics] = useState({
    grossTotal: 0,
    escrow: 0,
    disputes: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // جلب إحصائيات سريعة للبطاقات من الـ Finance API
  const initMetrics = async () => {
    try {
      const response = await serviceProviderFinanceInit();
      if (response.success) {
        setMetrics(response.data);
      }
    } catch (err) {
      console.error("Metrics Error:", err);
    }
  };

  // جلب النزاعات الفعلية للـ Provider
  const fetchDisputesData = useCallback(async () => {
    setTableLoading(true);
    try {
      // الـ API المذكور في التوثيق الخاص بك لجلب نزاعات المستخدم الحالي
      const response = await api.get("/dispute");
      const finalData = response.data?.data || response.data || [];
      setDisputes(finalData);
    } catch (err) {
      console.error("Fetch Disputes Error:", err);
    } finally {
      setTableLoading(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initMetrics();
    fetchDisputesData();
  }, [fetchDisputesData]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-zinc-700" size={40} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* HEADER - تم تغيير العنوان ليتناسب مع الصفحة */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
            DISPUTES
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            Arbitration & Conflict Resolution Center
          </p>
        </div>
        <button 
          onClick={fetchDisputesData}
          className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all active:scale-95"
        >
          <RefreshCw size={20} className={tableLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Gross Volume" amount={metrics.grossTotal} icon={TrendingUp} />
        <MetricCard title="Safety Escrow" amount={metrics.escrow} icon={Timer} variant="blue" />
        <MetricCard 
          title="Under Review" 
          amount={disputes.filter(d => d.status === 'in_review').length} 
          icon={ShieldAlert} 
          variant="red" 
          isCount 
        />
        <MetricCard title="Balance" amount={metrics.balance} icon={ShieldAlert} variant="green" />
      </div>

      {/* استخدام الجدول الموحد بدلاً من بناء الأعمدة هنا */}
      <DisputesTable 
        data={disputes} 
        loading={tableLoading} 
        onRefresh={fetchDisputesData} 
        role="provider" // هذا يضمن ظهور أزرار (View Details / Submit Response)
        onCustomAction={(type, id) => {
          if (type === 'view') navigate(`/disputes/${id}`);
          if (type === 'respond') navigate(`/disputes/respond/${id}`);
        }}
      />
    </div>
  );
};

export default SPDisputes;