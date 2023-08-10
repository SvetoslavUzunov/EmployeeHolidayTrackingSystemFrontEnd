import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import UsersList from '../Users/UsersList';
import SearchBar from '../SearchBar';
import * as userService from '../../services/userService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const AllUsers = () => {
    const [users, setUsers] = useState(null);
    const [inputText, setInputText] = useState("");
    const { auth } = useAuthContext();

    useEffect(() => {
        userService.getAllAsync()
            .then(result => {
                // let allUsersExceptAdmin = result.filter(user => user.email != authenticationConstants.AdminEmail)
                const sortResult = [...result].sort((a, b) => (
                    a.userName > b.userName ? 1 : -1
                ))
                setUsers(sortResult);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    let inputHandler = (e) => {
        var valueToLowerCase = e.target.value.toLowerCase();
        setInputText(valueToLowerCase);
    };

    return (
        <>
            {auth.role == authenticationConstants.AdminRole || auth.role == authenticationConstants.SupervisorRole ?
                <>
                    <SearchBar inputValue={inputHandler} />
                    <section className='dashboard'>
                        <h1>All Employees</h1>
                        <section>
                            <UsersList users={users} inputValues={inputText} />
                        </section>
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.AccessDenied}</p>}
        </>
    );
}

export default AllUsers;