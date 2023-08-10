import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
import * as userService from '../../services/userService';
import * as userConstants from '../../constants/userConstants';
import * as authenticationConstants from '../../constants/authenticationConstants';
import './MyAccount.css';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const { auth, logout } = useAuthContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    const deleteHandler = (e) => {
        e.preventDefault();

        userService.removeAsync(user?.id, auth.accessToken)
            .then(() => {
                logout();
                navigate('/register');

                addNotification(userConstants.DeleteAccountAsUser, types.success);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            })
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    };

    return (
        <>
            {auth.accessToken ?
                <>
                    <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onDelete={deleteHandler} />
                    <section className='dashboard'>
                        <h1>My Account</h1>
                        <div className="container">
                            <div className="row card-header">
                                <div className="card text-center mb-3">
                                    <div className="card-header">
                                        Profile details
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text text-secondary">Username: {user?.userName}</p>
                                        <p className='card-text text-secondary'>Email address: {user?.email}</p>
                                        {auth.role == authenticationConstants.EmployeeRole ?
                                            <>
                                                <p className='card-text text-secondary'>Supervisor: {user?.supervisorEmailAddress}</p>
                                                <Link className="button remove-button" to={`#`} onClick={deleteClickHandler}>Delete my account</Link>
                                            </>
                                            : <></>
                                        }
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.PleaseRegisterOrLogin}</p>}
        </>
    );
}

export default MyAccount;