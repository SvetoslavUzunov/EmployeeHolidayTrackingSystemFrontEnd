import RequestCard from "../Users/RequestCard";
import * as holidayRequestConstants from '../../constants/holidayRequestConstants';

const RequestsList = ({
    requests,
    inputValues
}) => {
    const filteredData = requests?.filter((request) => {
        if (inputValues === '') {
            return request;
        }
        else {
            return request?.startDate.toLowerCase().includes(inputValues.trim())
                || request?.endDate.toLowerCase().includes(inputValues.trim())
                || request?.createdOn.toLowerCase().includes(inputValues.trim());
        }
    });

    return (
        <>
            {filteredData?.length > 0
                ? (<ul className="other-users-list">
                    {filteredData.map(x => <RequestCard key={x.id} request={x} />)}
                </ul>)
                : < p className="no-users">{holidayRequestConstants.NoHolidayFound}</p>
            }
        </>
    );
}

export default RequestsList;