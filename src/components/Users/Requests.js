import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import RequestsList from '../Users/RequestsList';
import SearchBar from '../SearchBar';
import * as holidayRequestService from '../../services/holidayRequestService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const Requests = () => {
    const [requests, setRequests] = useState([])
    const [inputText, setInputText] = useState("");
    const { auth } = useAuthContext();

    useEffect(() => {
        holidayRequestService.getAllAsync()
            .then(result => {
                const sortResult = [...result].sort((a, b) => (
                    a.createdOn > b.createdOn ? -1 : 1
                ))
                setRequests(sortResult);
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
            {auth.role == authenticationConstants.SupervisorRole ?
                <>
                    <SearchBar inputValue={inputHandler} />
                    <section className='dashboard'>
                        <h1>All Requests</h1>
                        <section>
                            <RequestsList requests={requests} inputValues={inputText} />
                        </section>
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.AccessDenied}</p>}
        </>
    );
}

export default Requests;