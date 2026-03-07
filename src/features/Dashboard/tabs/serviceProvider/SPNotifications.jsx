import React, { useEffect, useState, useCallback } from "react";
import { getNotifications, markNotificationAsRead } from "../../../../api/notificationaApi"; 
import NotificationsTable from "../../../../components/ui/dashboard/NotificationTable";
import { useNotifications } from "../../../../contexts/NotificationContext";
export default function SPNotifications() {

  const { setUnreadCount } = useNotifications();
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getNotifications({
        page,
        limit: 10,
      });

      
      setNotifications(res.notifications || []);
      setTotalPages(res.meta?.pages || 1);

    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Full modification: View opens Modal + makes the message read
  const handleView = async (notification) => {
    console.log(notification);
    // open Modal
    setSelectedNotification(notification);
    setIsModalOpen(true);
    
    // If it is unread
    if (!notification.isRead) {
      try {
        // This modifies the read state in the DB.
        await markNotificationAsRead(notification.id);

        // (Optimistic Update)
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
         
        setUnreadCount((prev) => Math.max(prev - 1, 0));

      } catch (err) {
        console.error("Error marking as read:", err);
      }
    }
  };

  return (
    <div className="p-8 space-y-8">

      <NotificationsTable
        notifications={notifications}
        loading={loading}
        pagination={{ page, totalPages }}
        onPageChange={handlePageChange}
        onView={handleView}
      />

     
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">

          <div className="bg-black p-6 rounded-2xl w-[500px] space-y-4 shadow-lg">

            <h2 className="text-lg font-semibold">
              Notification
            </h2>

            <p className="text-gray-400">
              {selectedNotification.message}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}