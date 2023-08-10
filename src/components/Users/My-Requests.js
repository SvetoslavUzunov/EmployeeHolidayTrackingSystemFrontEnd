import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import RequestsList from '../Users/RequestsList';
import SearchBar from '../SearchBar';
import * as userService from '../../services/userService';
import * as holidayRequestService from '../../services/holidayRequestService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const MyRequests = () => {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([])
    const [inputText, setInputText] = useState("");
    const { auth } = useAuthContext();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    useEffect(() => {
        holidayRequestService.getAllAsync()
            .then(result => {
                let allUserRequests = result.filter(request => request.userId == user?.id);
                const sortResult = [...allUserRequests].sort((a, b) => (
                    a.createdOn > b.createdOn ? -1 : 1
                ))
                setRequests(sortResult);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [user?.id]);

    let inputHandler = (e) => {
        var valueToLowerCase = e.target.value.toLowerCase();
        setInputText(valueToLowerCase);
    };

    return (
        <>
            {auth.role == authenticationConstants.EmployeeRole ?
                <>
                    <SearchBar inputValue={inputHandler} />
                    <section className='dashboard'>
                        <h1>My Requests</h1>
                        <section>
                            <RequestsList requests={requests} inputValues={inputText} />
                        </section>
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.AccessDenied}</p>}
        </>
    );
}

export default MyRequests;