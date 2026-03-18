import React, { useEffect, useState, useCallback } from "react";
import { getNotifications, markNotifications } from "../../../api/notificationaApi"; 
import NotificationsTable from "../../ui/dashboard/NotificationTable";
import {markAllNotificationsAsRead} from "../../../api/notificationaApi";
import { useProfile } from "../../../contexts/ProfileContext";
import { Filter ,MailCheck,Check} from "lucide-react";
const NotificationsPage = ({role}) => {

      const { profile, fetchProfile } = useProfile();  
      const [notifications, setNotifications] = useState([]);
      const [loading, setLoading] = useState(false);
      const [totalPages, setTotalPages] = useState(1);  
      const [selectedNotification, setSelectedNotification] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [filters, setFilters] = useState({
      page: 1,
      limit: 10,
      readStatus: "" 
      });
      const [selectedIds, setSelectedIds] = useState([]);
    
        const fetchNotifications = useCallback(async () => {
          try {
            setLoading(true);
    
            const params = {
              page: filters.page,
              limit: filters.limit,
    
              ...(filters.readStatus === "read" && { isRead: true }),
              ...(filters.readStatus === "unread" && { isRead: false }),
              ...(filters.readStatus === "" && { isRead: "all" }),
            };
    
            const res = await getNotifications(params);
    
            setNotifications(res.notifications || []);
            setSelectedIds([]); // reset selection
            setTotalPages(res.meta?.pages || 1);
    
          } catch (error) {
            console.error("Error fetching notifications:", error);
          } finally {
            setLoading(false);
          }
        }, [filters]);
    
      useEffect(() => {
        fetchNotifications();
      }, [filters,fetchNotifications]);
    
      const handlePageChange = (newPage) => {
        setSelectedIds([]); // reset selection
        setFilters((prev) => ({
        ...prev,
        page: newPage
        }));
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
            await markNotifications([notification.id]);
            // (Optimistic Update)
            setNotifications((prev) =>
              prev.map((n) =>
                n.id === notification.id ? { ...n, isRead: true } : n
              )
            );
             await fetchProfile();
          } catch (err) {
            console.error("Error marking as read:", err);
          }
        }
      };
    
      const handleFilterChange = (key, value) => {
        setSelectedIds([]); // reset selection
        setFilters((prev) => ({
          ...prev,
          [key]: value,
          page: 1
        }));
      };
    
      const handleMarkAllAsRead = async () => {
      try {
        await markAllNotificationsAsRead();
        // update interface
        fetchNotifications();
        // update notification counter
        await fetchProfile();
      } catch (err) {
        console.error("Error marking all notifications:", err);
      }
    
      };
    
      const toggleSelectNotification = (id) => {
      setSelectedIds((prev) =>
        prev.includes(id)
          ? prev.filter((nId) => nId !== id)
          : [...prev, id]
      );
      };
    
      const toggleSelectAll = (checked) => {
    
      if (checked) {
        setSelectedIds(notifications.map(n => n.id));
      } else {
        setSelectedIds([]);
      }
    
      };
    
        const handleMarkSelectedAsRead = async () => {

        if (!selectedIds.length) return;

        try {

            await markNotifications(selectedIds);
            setNotifications((prev) =>
            prev.map((n) =>
                selectedIds.includes(n.id)
                ? { ...n, isRead: true }
                : n
            )
            );
            setSelectedIds([]);
            await fetchProfile();
        } catch (error) {
            console.error("Error marking selected notifications", error);
        }

        };
    return (
        <div className="p-10 space-y-8">
    <div className="flex flex-wrap items-center gap-4">
        
        <div className="relative group min-w-[160px]">
        <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            size={14}
        />
        <select
            value={filters.readStatus}
            onChange={(e) => handleFilterChange("readStatus", e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 pl-10 pr-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none focus:ring-2 ring-blue-500/20 transition-all outline-none cursor-pointer"
        >
            <option value="">All Notifications</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
        </div>

        
        <button
        onClick={handleMarkSelectedAsRead}
        disabled={!selectedIds.length}
        className={`
            flex items-center gap-3 px-6 py-3 rounded-2xl
            text-[10px] font-black uppercase tracking-widest whitespace-nowrap
            border border-zinc-200 dark:border-white/5
            bg-white dark:bg-zinc-900 transition-all
            focus:ring-2 ring-blue-500/20
            ${selectedIds.length 
            ? "hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-white" 
            : "opacity-40 cursor-not-allowed text-zinc-400"}
        `}
        >
        <Check size={16} className="shrink-0" />
        <span>Mark as read</span>
        </button>

        
        <button
        onClick={handleMarkAllAsRead}
        disabled={!profile?.unReadNotifications}
        className={`
            flex items-center gap-3 px-6 py-3 rounded-2xl
            text-[10px] font-black uppercase tracking-widest whitespace-nowrap
            border border-zinc-200 dark:border-white/5
            transition-all focus:ring-2 ring-blue-500/20
            ${profile?.unReadNotifications > 0 
            ? "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5" 
            : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 cursor-not-allowed"}
        `}
        >
        <MailCheck size={16} className="shrink-0" />
        <span>Mark all as read</span>
        
        {profile?.unReadNotifications > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[9px] bg-blue-500 text-white rounded-full font-bold">
            {profile?.unReadNotifications}
            </span>
        )}
        </button>
    </div>

    
    <NotificationsTable
        notifications={notifications}
        loading={loading}
        pagination={{ page: filters.page, totalPages }}
        onPageChange={handlePageChange}
        onView={handleView}
        selectedIds={selectedIds}
        toggleSelectNotification={toggleSelectNotification}
        toggleSelectAll={toggleSelectAll}
    />
    </div>
    )
}

export default NotificationsPage