import React, { useEffect, useState, useCallback } from "react";
// import { getNotifications } from "../../api/notifications.api";
import NotificationsTable from "../../../../components/ui/dashboard/NotificationTable";

export default function SPNotifications() {


  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getNotifications({
        page,
        limit: 10,
      });

      setNotifications(res.notification);
      setTotalPages(res.metadata.totalPages);

    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // =========================
  // 3️⃣ useEffect
  // =========================

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // =========================
  // 4️⃣ Handlers
  // =========================

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleMarkAsRead = (notification) => {
    console.log("Mark as read:", notification.id);
    // هنا تضع API call
  };

  const handleView = (notification) => {
    console.log("View notification:", notification.id);
    // هنا تضع navigation او modal
  };

  // =========================
  // 5️⃣ UI
  // =========================

  return (
    <div className="p-8 space-y-8">
     

      <NotificationsTable
        notifications={notifications}
        loading={loading}
        pagination={{
          page,
          totalPages,
        }}
        onPageChange={handlePageChange}
        onMarkAsRead={handleMarkAsRead}
        onView={handleView}
      />
    </div>
  );
}