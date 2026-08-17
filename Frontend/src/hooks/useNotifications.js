import { useEffect, useMemo, useState } from "react";
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from "../services/doctorApi";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupFilter, setGroupFilter] = useState("All");

  useEffect(() => {
    let mounted = true;
    fetchNotifications().then((data) => { if (mounted) { setNotifications(data); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => notifications.filter((n) => groupFilter === "All" || n.group === groupFilter),
    [notifications, groupFilter]
  );

  const groupedFiltered = useMemo(() => {
    const map = {};
    filtered.forEach((n) => { map[n.group] = map[n.group] || []; map[n.group].push(n); });
    return map;
  }, [filtered]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  async function markRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await markNotificationRead(id, true);
  }

  async function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await markAllNotificationsRead();
  }

  return { notifications: filtered, groupedFiltered, allNotifications: notifications, loading, groupFilter, setGroupFilter, unreadCount, markRead, markAllRead };
}
