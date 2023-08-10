import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authenticationConstants from '../../constants/authenticationConstants';
import ConfirmDialogDeclineHoliday from '../Common/ConfirmDialogDeclineHoliday/ConfirmDialogDeclineHoliday';
import * as holidayRequestConstants from '../../constants/holidayRequestConstants';
import * as holidayRequestService from '../../services/holidayRequestService';
import * as userService from '../../services/userService';

const RequestCard = ({
    request
}) => {
    const { auth } = useAuthContext();
    const [user, setUser] = useState(null);
    const [showDeclineHolidayDialog, setShowDeclineHolidayDialog] = useState(false);
    const [comment, setComment] = useState();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        const getUserById = async () => {
            let userData = await userService.getByIdAsync(request?.userId);
            setUser(userData);
        }

        getUserById();
    }, [request?.userId])

    const approveHolidayRequest = async (e) => {
        e.preventDefault();
        if (user?.holidayDaysRemaining - request?.holidayRequestCountDays >= 0) {
            let userData = {
                id: request?.userId,
                email: user?.email,
                holidayDaysRemaining: user?.holidayDaysRemaining - request?.holidayRequestCountDays
            }

            userService.editAsync(userData);

            let holidayRequestData = {
                id: request?.id,
                startDate: request?.startDate,
                endDate: request?.endDate,
                status: 0,
                userId: user?.id,
                isActive: true
            }

            holidayRequestService.editAsync(holidayRequestData);

            addNotification(holidayRequestConstants.ApprovedHolidayRequest, types.success);

            window.location.reload(true);
        }
        else {
            addNotification(holidayRequestConstants.EmployeeDoesntHaveEnoughHolidayDays, types.warning);
        }
    }

    const declineHolidayHandler = async () => {

        let holidayRequestData = {
            id: request?.id,
            startDate: request?.startDate,
            endDate: request?.endDate,
            status: 1,
            userId: user?.id,
            supervisorDisapprovedComment: comment,
            isActive: true
        }

        holidayRequestService.editAsync(holidayRequestData);

        setShowDeclineHolidayDialog(false);
        addNotification(holidayRequestConstants.DisapprovedHolidayRequest, types.success)
        window.location.reload(true);
    }

    const declineHolidayHandlerClick = (e) => {
        e.preventDefault();

        setShowDeclineHolidayDialog(true);
    }

    return (
        <>
            <ConfirmDialogDeclineHoliday show={showDeclineHolidayDialog} commentValue={(e) => setComment(e.target.value)} onClose={() => setShowDeclineHolidayDialog(false)} onDelete={declineHolidayHandler} />
            {auth.role == authenticationConstants.SupervisorRole || auth.role == authenticationConstants.EmployeeRole ?
                <div className="container">
                    <div className="row card-header">
                        <div className="card text-center mb-3">
                            <div className="card-header">
                                Holiday Request details
                            </div>
                            <div className="card-body">
                                <p className="card-text text-secondary">Created on: {new Date(request?.createdOn).toLocaleDateString('bg-BG')}</p>
                                <p className="card-text text-secondary">Type: Paid Leave</p>
                                {auth.role == authenticationConstants.SupervisorRole ?
                                    <p className="card-text text-secondary">From: {user?.userName}</p>
                                    : <></>}
                                <p className="card-text text-secondary">Start date: {new Date(request?.startDate).toLocaleDateString('bg-BG')}</p>
                                <p className='card-text text-secondary'>End date: {new Date(request?.endDate).toLocaleDateString('bg-BG')}</p>
                                <p className='card-text text-secondary'>Days taken: {request?.holidayRequestCountDays}</p>
                                <p className='card-text text-secondary'>Status: {request?.status == holidayRequestConstants.ApprovedStatus ? 'Approved' : request?.status == holidayRequestConstants.DisapprovedStatus ? 'Disapproved' : 'Pending'}</p>
                                {auth.role == authenticationConstants.EmployeeRole && request?.status == holidayRequestConstants.DisapprovedStatus ?
                                    <p className='card-text text-secondary'>Supervisor comment: {request?.supervisorDisapprovedComment}</p>
                                    : <></>}
                                {request?.status == holidayRequestConstants.PendingStatus && auth.role == authenticationConstants.SupervisorRole ?
                                    <>
                                        <Link className="button button-approve" onClick={approveHolidayRequest} to={`#`} >Approve</Link>
                                        <Link className="button button-decline" onClick={declineHolidayHandlerClick} to={`#`} >Decline</Link>
                                    </>
                                    : <></>}
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
                : <></>}
        </>
    );
}

export default RequestCard; 