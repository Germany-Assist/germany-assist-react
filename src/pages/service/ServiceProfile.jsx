import React, { useEffect, useState } from "react";
import {
  Star,
  Globe,
  ShieldCheck,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle,
  Eye,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchServiceProfile,
  fetchPaymentIntentApi,
} from "../../api/publicApis";
import ImageGallery from "../../components/ui/ImageGallery";
import BookingSidebar from "../../features/service/serviceProfile/BookingSidebar";
import ReviewsSection from "../../features/service/serviceProfile/ReviewComponent";
import NavigationBar from "../../components/ui/NavigationBar";
import ShareSheet from "../../components/ui/ShareSheet";
import PaymentModal from "../../components/ui/PaymentModal";
import { useProfile } from "../../contexts/ProfileContext";

const ServiceProfile = ({ previewData = null }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(previewData);
  const [loading, setLoading] = useState(!previewData);
  const {
    toggleFavorite,
    isInFavorite,
    profile,
    isAlreadyPurchasedService,
    isAlreadyPurchasedTimeline,
  } = useProfile();

  const [isFavorite, setIsFavorite] = useState(null);
  const [hasPurchasedService, setHasPurchasedService] = useState(null);
  const [hasPurchasedTimeline, setHasPurchasedTimeline] = useState(false);
  const [purchasedTimelines, setPurchasedTimelines] = useState([]);

  // Modals & Payment State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({
    isOpen: false,
    clientSecret: "",
  });

  // 1. Fetch Service Data
  useEffect(() => {
    if (previewData) {
      setData(previewData);
      setLoading(false);
      return;
    }
    const loadData = async () => {
      try {
        const res = await fetchServiceProfile(serviceId);
        setData(res);
      } catch (err) {
        console.error("Failed to load service", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [serviceId, previewData]);

  // 2. Sync Purchase States from Hooks
  useEffect(() => {
    setIsFavorite(isInFavorite(serviceId));
    if (data) {
      const ps = isAlreadyPurchasedService(data);
      setHasPurchasedService(ps);
      setHasPurchasedTimeline(Boolean(isAlreadyPurchasedTimeline(data)));
      if (ps) setPurchasedTimelines(isAlreadyPurchasedService(data));
    }
  }, [profile, data]);

  const handleInitiatePayment = async () => {
    setIsPreparingPayment(true);
    try {
      const res = await fetchPaymentIntentApi(data.id || serviceId);
      if (res) {
        setPaymentConfig({
          isOpen: true,
          clientSecret: res.message.clientSecret,
        });
      }
    } catch (err) {
      console.error("Payment initialization failed", err);
    } finally {
      setIsPreparingPayment(false);
    }
  };

  const handleNavigateToTimeline = (tid) =>
    navigate(`/experience/${serviceId}/${tid}`);

  if (loading || !data)
    return (
      <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" />
      </div>
    );

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 pb-20 relative">
      <NavigationBar />
      <ShareSheet
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={window.location.href}
        title={data.title}
      />

      <PaymentModal
        isOpen={paymentConfig.isOpen}
        onClose={() => setPaymentConfig((p) => ({ ...p, isOpen: false }))}
        clientSecret={paymentConfig.clientSecret}
        amount={data.price}
      />

      {/* Nav Bar */}
      <nav className="border-b border-light-700 dark:border-white/5 bg-light-900/50 dark:bg-black/10 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
            <span
              className="hover:text-accent cursor-pointer"
              onClick={() => navigate("/services")}
            >
              Services
            </span>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-slate-900 dark:text-white font-medium capitalize">
              {data.category?.replace("-", " ")}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-accent transition-all active:scale-95"
            >
              <Share2 size={16} className="mr-2" /> Share
            </button>
            <button
              onClick={() => toggleFavorite(data)}
              className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-all active:scale-95"
            >
              <Heart
                size={16}
                className={`mr-2 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />{" "}
              Favorite
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white capitalize mb-6">
          {data.title}
        </h1>

        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-light-700 dark:border-white/5 mb-16">
          <ImageGallery assets={data.assets || []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="pt-4">
              <h3 className="text-2xl font-bold mb-6 italic">
                About this service
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-[2.2rem] text-lg whitespace-pre-line font-light">
                {data.description}
              </p>
            </div>
            <ReviewsSection
              reviews={data.reviews || []}
              totalReviews={data.totalReviews}
              rating={data.rating}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingSidebar
              price={data.price}
              rating={data.rating}
              category={data.category}
              providerEmail={data.ServiceProvider?.email}
              onBuy={handleInitiatePayment}
              isProcessing={isPreparingPayment}
              hasPurchasedTimeline={hasPurchasedTimeline}
              purchasedTimelines={purchasedTimelines}
              onNavigate={handleNavigateToTimeline}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceProfile;
