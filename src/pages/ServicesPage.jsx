import React, { useState, useEffect, useCallback } from "react";
import ServicesPageHUD from "../features/service/ServicesPageHUD";
import ServiceGrid from "../features/service/ServiceGrid";
import ServicesPagePagination from "../features/service/ServicesPagePagination";
import { useMeta } from "../contexts/MetadataContext";
import { useProfile } from "../contexts/ProfileContext";
import NavigationBar from "../components/ui/NavigationBar";
import { fetchServicesApi } from "../api/publicApis";

const ServicesPage = () => {
  const { meta } = useMeta();
  const { favorites, toggleFavorite } = useProfile();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    maxRating: "",
    sort: "price",
    order: "asc",
  });

  const fetchServices = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setIsSearching(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: "9",
          title: search,
          ...Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== "")
          ),
        });
        const result = await fetchServicesApi(query);
        setServices(result.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [page, search, filters]
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => fetchServices(true), 450);
    return () => clearTimeout(timer);
  }, [search]);

  // Immediate update
  useEffect(() => {
    fetchServices(false);
  }, [page, filters.sort, filters.order, filters.category]);

  const handleUpdate = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    setPage(1);
  };

  return (
    <>
      <NavigationBar />
      <div className="bg-[#0f1115] min-h-screen p-6 md:p-10 text-slate-200">
        <ServicesPageHUD
          search={search}
          setSearch={setSearch}
          filters={filters}
          onUpdate={handleUpdate}
          onApply={() => fetchServices(false)}
          isSearching={isSearching}
          categories={meta?.categories}
        />
        <main className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[450px] bg-white/5 animate-pulse rounded-[2.5rem]"
                />
              ))}
            </div>
          ) : (
            <ServiceGrid
              services={services}
              isSearching={isSearching}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {!loading && services.length > 0 && (
            <ServicesPagePagination
              page={page}
              setPage={setPage}
              hasMore={services.length === 9}
            />
          )}
        </main>
        <style>{`@keyframes loading-bar { 0% { width: 0%; left: 0%; } 50% { width: 100%; left: 0%; } 100% { width: 0%; left: 100%; } }`}</style>
      </div>
    </>
  );
};

export default ServicesPage;
