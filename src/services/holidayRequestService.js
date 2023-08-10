import * as request from "../utility/requester";
import * as holidayRequestConstants from '../constants/holidayRequestConstants';

const holidayRequestsUrl = holidayRequestConstants.HolidayRequestsUrl;

export const getByIdAsync = async (holidayRequestId) => {
    return await fetch(`${holidayRequestsUrl}/GetById/${holidayRequestId}`)
        .then(res => res.json());
};

export const getAllAsync = async () => request.get(`${holidayRequestsUrl}/GetAll`);

export const createAsync = async (startDate,
    endDate,
    supervisorDisapprovedComment,
    holidayRequestCountDays,
    userId,
    token) => {
    let response = await fetch(`${holidayRequestsUrl}/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            startDate,
            endDate,
            supervisorDisapprovedComment,
            holidayRequestCountDays,
            userId
        })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
};

export const editAsync = (holidayRequestData) => request.put(`${holidayRequestsUrl}/Edit`, holidayRequestData);

export const removeAsync = async (holidayRequestId, token) => {
    return await fetch(`${holidayRequestsUrl}/DeleteById/${holidayRequestId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};