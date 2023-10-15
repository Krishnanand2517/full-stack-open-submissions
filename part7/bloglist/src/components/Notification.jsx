import { useSelector } from 'react-redux';

const Notification = ({ isError }) => {
    const message = useSelector(state => state.notification);

    if (!message) {
        return null;
    }

    const styleClass = message.isError ? "message redError" : "message";

    return (
        <div className={styleClass}>
            {message.content}
        </div>
    );
};

export default Notification;