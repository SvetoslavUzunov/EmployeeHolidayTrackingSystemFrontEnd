import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import Calendar from "react-calendar";
import moment from 'moment-business-days';
import Modal from "react-modal";
import * as holidayRequestService from '../../services/holidayRequestService';
import * as userService from '../../services/userService';
import * as holidayRequestConstants from '../../constants/holidayRequestConstants';
import "react-calendar/dist/Calendar.css";

Modal.setAppElement("#root");

const CalendarView = ({
    userId }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [daysDiff, setDaysDiff] = useState(0);
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { auth } = useAuthContext();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setDaysDiff(0);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        calculateDaysDiff(date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        calculateDaysDiff(startDate, date);
    };

    const calculateDaysDiff = (start, end) => {
        const startMoment = moment(start);
        const endMoment = moment(end);

        let countDays = 0;
        for (let date = startMoment; date.isSameOrBefore(endMoment); date.add(1, 'days')) {
            if (date.isBusinessDay()) {
                countDays++;
            }
        }

        setDaysDiff(countDays);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "white",
            border: "2px solid black",
            borderRadius: "20px",
            textAlign: 'center'
        },

        overlay: {
            backgroundColor: "rgba(0,0,0,0.7)"
        }
    };

    const createHolidayRequest = () => {
        if (daysDiff > Number(0)) {
            let supervisorDisapprovedComment = " ";
            let holidayRequestCountDays = daysDiff;

            setStartDate(new Date(startDate).toISOString());
            setEndDate(new Date(endDate).toISOString());

            holidayRequestService.createAsync(
                startDate,
                endDate,
                supervisorDisapprovedComment,
                holidayRequestCountDays,
                userId
                , auth.accessToken)
                .then(() => {
                }).catch((error) => {
                    console.log(error);
                })

            closeModal();
            setStartDate(new Date())
            setEndDate(new Date());
            setDaysDiff(0);

            addNotification(holidayRequestConstants.RequestHoliday, types.success);
        }
    }

    return (
        <div >
            {user?.holidayDaysRemaining <= Number(0) ?
                <button className="button home-request-absence-button" onClick={openModal} disabled>Request absence</button>
                :
                <button className="button home-request-absence-button" onClick={openModal}>Request absence</button>
            }
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>

                <h1 className="text-center">Request Holiday</h1>
                <div className="calendar-container" style={{ display: "inline-flex" }}>
                    <div className="calendar-item" style={{ margin: 20, textAlign: "center" }}>
                        <h3>Start Date</h3>
                        <Calendar onChange={handleStartDateChange} />
                    </div>
                    <div className="calendar-item" style={{ margin: 20, textAlign: "center" }}>
                        <h3>End Date</h3>
                        <Calendar onChange={handleEndDateChange} />
                    </div>
                </div>
                <p className="text-center">
                    <span className="bold">Days taken:</span> {daysDiff}
                </p>
                {
                    (daysDiff > Number(0) && user?.holidayDaysRemaining >= daysDiff)
                        ?
                        <button className="button button-send-request" onClick={createHolidayRequest}>Send request</button>
                        :
                        <button className="button button-send-request" onClick={createHolidayRequest} disabled>Send request</button>
                }
            </Modal>
        </div>
    );
}

export default CalendarView;