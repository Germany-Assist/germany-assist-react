import React, { useEffect, useState } from "react";
import { ChevronRight, Share2, Heart, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchServiceProfile,
  fetchPaymentIntentApi,
} from "../../../api/publicApis";
import ImageGallery from "../../../components/ui/ImageGallery";
import BookingSidebar from "./BookingSidebar";
import ReviewsSection from "./ReviewComponent";
import NavigationBar from "../../../components/ui/NavigationBar";
import ShareSheet from "../../../components/ui/ShareSheet";
import PaymentModal from "../../../components/ui/PaymentModal";
import { useProfile } from "../../../contexts/ProfileContext";
import { fetchUserReviewForServiceApi } from "../../../api/profile";
import { useMeta } from "../../../contexts/MetadataContext";

const ServiceProfile = ({ previewData = null }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { categories } = useMeta();
  // 1. Initialize data with previewData or null
  const [data, setData] = useState(previewData);
  const [loading, setLoading] = useState(!previewData);

  const {
    toggleFavorite,
    isInFavorite,
    profile,
    isAlreadyPurchasedService,
    isAlreadyPurchasedTimeline,
  } = useProfile();

  const [isFavorite, setIsFavorite] = useState(false);
  const [hasPurchasedService, setHasPurchasedService] = useState(false);
  const [hasPurchasedTimeline, setHasPurchasedTimeline] = useState(false);
  const [purchasedTimelines, setPurchasedTimelines] = useState([]);
  const [hasReview, setHasReview] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({
    isOpen: false,
    clientSecret: "",
  });

  // 2. Load Data Effect: Bypassed if previewData exists
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

  // 3. Status Check Effect: Bypassed if previewData exists
  useEffect(() => {
    if (previewData || !data) {
      // Set default visual states for preview mode
      setIsFavorite(false);
      setHasPurchasedService(false);
      return;
    }

    setIsFavorite(isInFavorite(serviceId));
    const ps = isAlreadyPurchasedService(data);
    setHasPurchasedService(ps);
    setHasPurchasedTimeline(Boolean(isAlreadyPurchasedTimeline(data)));

    if (ps) {
      setPurchasedTimelines(ps);
      (async () => {
        const review = await fetchUserReviewForServiceApi(serviceId);
        setHasReview(review);
      })();
    }
  }, [profile, data, previewData, serviceId]);

  const handleInitiatePayment = async () => {
    if (previewData) return; // Disable actual payments in preview
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

  const handleNavigateToTimeline = (tid) => {
    if (previewData) return;
    navigate(`/timeline/${tid}`);
  };

  if (loading || !data)
    return (
      <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" />
      </div>
    );

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700 pb-20 relative">
      {/* Hide Global Nav in Preview */}
      {!previewData && <NavigationBar />}

      <ShareSheet
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={previewData ? "#" : window.location.href}
        title={data.title}
      />

      <PaymentModal
        isOpen={paymentConfig.isOpen}
        onClose={() => setPaymentConfig((p) => ({ ...p, isOpen: false }))}
        clientSecret={paymentConfig.clientSecret}
        amount={data.price}
      />

      {/* Sub-Nav Bar */}
      <nav className="border-b border-light-700 dark:border-white/5 bg-light-900/50 dark:bg-black/10 backdrop-blur-md sticky top-0 ">
        <div className="  max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className=" flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
            <span
              className="hover:text-accent cursor-pointer"
              onClick={() => !previewData && navigate("/services")}
            >
              Services
            </span>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-slate-900 hover:text-accent dark:text-white font-medium capitalize cursor-pointer">
              {data.category
                ? categories.find((i) => i.id === data.category).title
                : "Category"}
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
              onClick={() => !previewData && toggleFavorite(data)}
              className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-all active:scale-95"
            >
              <Heart
                size={16}
                className={`mr-2 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              Favorite
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white capitalize mb-6">
          {data.title || "Untitled Service"}
        </h1>

        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-light-700 dark:border-white/5 mb-16">
          {/* Ensure ImageGallery doesn't crash on empty assets */}
          <ImageGallery
            assets={
              data.assets?.length > 0
                ? data.assets
                : [
                    "https://via.placeholder.com/1200x600?text=No+Image+Provided",
                  ]
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="pt-4">
              <h3 className="text-2xl font-bold mb-6 italic">
                About this service
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-[2.2rem] text-lg whitespace-pre-line font-light break-words">
                {data.description || "No description provided yet."}
              </p>
            </div>

            {/* Reviews disabled in preview or uses dummy list */}
            <ReviewsSection
              reviews={data.reviews || []}
              totalReviews={data.totalReviews || 0}
              rating={data.rating || 0}
              serviceId={serviceId}
              existingReview={hasReview}
              canReview={hasPurchasedService}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingSidebar
              price={data.price || 0}
              rating={data.rating || 0}
              category={data.category}
              providerEmail={
                data.ServiceProvider?.email || "provider@example.com"
              }
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
