import { useState, useEffect } from "react";
import api from "../api/api.js";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnreadNotifications = async (isInitialLoad = false) => {
      if (!localStorage.getItem("access")) {
        return;
      }

      try {
        const response = await api.get("notifications/unread/");
        setNotifications(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isInitialLoad) setIsLoading(false);
      }
    };

    fetchUnreadNotifications(true);

    const intervalId = setInterval(() => {
      fetchUnreadNotifications(false);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    notifications,
    setNotifications,
    notificationCount: notifications.length,
    isLoading,
  };
};

export default useNotifications;
