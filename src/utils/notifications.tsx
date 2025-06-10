import useNotificationStore from "../stores/useNotificationStore";

export function notify(newNotification: {
  type?: string;
  message: string;
  description?: string;
  txid?: string;
}) {
  const { notifications, set: setNotifications } =
    useNotificationStore.getState();
    
    setNotifications((state: { notifications: any[] }) => {
      state.notifications = [
        ...notifications,
        { type: "success", ...newNotification },
      ];
      });
    }
