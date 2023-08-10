import { createContext, useContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const types = {
    error: 'danger',
    warning: 'dark',
    info: 'info',
    success: 'success',
}

const initialNotificationState = { show: false, message: '', type: types.error };
const ExpirationTime = 4000;

export const NotificationProvider = ({
    children
}) => {
    const [notification, setNotification] = useState(initialNotificationState);

    const addNotification = useCallback((message, type = types.error) => {
        setNotification({ show: true, message, type });

        setTimeout(() => {
            setNotification(initialNotificationState);
        }, ExpirationTime);

    }, [initialNotificationState, ExpirationTime]);

    const hideNotification = useCallback(() => setNotification(initialNotificationState), [])

    return (
        <NotificationContext.Provider value={{ notification, addNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    )
};

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}