import UserCard from "../Users/UserCard";
import * as userConstants from '../../constants/userConstants';

const UsersList = ({
    users,
    inputValues
}) => {
    const filteredData = users?.filter((user) => {
        if (inputValues === '') {
            return user;
        }
        else {
            return user?.userName.toLowerCase().includes(inputValues.trim())
                || user?.email.toLowerCase().includes(inputValues.trim());
        }
    });

    return (
        <>
            {filteredData?.length > 0
                ? (<ul className="other-users-list">
                    {filteredData.map(x => <UserCard key={x.id} user={x} />)}
                </ul>)
                : < p className="no-users">{userConstants.NoUsersFound}</p>
            }
        </>
    );
}

export default UsersList;