import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authService from '../../services/authenticationService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const Logout = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuthContext();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        authService.logoutAsync(auth.refreshToken)
            .then(() => {
                logout();
                navigate('/');
                addNotification(authenticationConstants.SuccessfullyLogout, types.success);
            })
    }, [])

    return null;
};

export default Logout;