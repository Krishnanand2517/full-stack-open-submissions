import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
    const notification = useNotificationValue();

    if (!notification) return null;

    const styleClass = notification.isError ? "message redError" : "message";

    return (
        <div className={styleClass}>
            {notification.content}
        </div>
    );
};

export default Notification;