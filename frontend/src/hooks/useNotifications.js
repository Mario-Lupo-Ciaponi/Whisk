import { useState, useEffect } from "react";
import api from "../api/api.js";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      if (!localStorage.getItem("access")) {
        return;
      }

      try {
        const response = await api.get("notifications/unread/");
        setNotifications(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUnreadNotifications();

    const intervalId = setInterval(fetchUnreadNotifications, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    notifications,
    notificationCount: notifications.length,
  };
};

export default useNotifications;
