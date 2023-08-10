import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import * as authenticationConstants from '../../constants/authenticationConstants';
import * as userService from '../../services/userService';
import Card from 'react-bootstrap/Card';
import CalendarView from "../Calendar/CalendarView";
import OutTodayList from "../OutTodayList/OutTodayList";

const Home = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const { auth } = useAuthContext();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    useEffect(() => {
        userService.getAllAsync()
            .then(result => {
                setUsers(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <section>
            {auth.accessToken ?
                <>
                    <div className="my-profile-section-main">
                        <h5 className="my-profile-section">My Profile</h5>
                        <hr />
                        <h5 className="my-profile-section">Hello, {user?.userName}!</h5>
                    </div>

                    <div className="cart-section">
                        <Card className="home-cart-main">
                            <Card.Header as="h6" className="home-cart">Employee Holiday Tracking at a glance</Card.Header>
                            <Card.Body>
                                <Card.Title as='h4' className="home-cart">{users.length}</Card.Title>
                                <Card.Text as="h6">active employees</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <OutTodayList />
                    {auth.role == authenticationConstants.EmployeeRole ?
                        <div className="my-absence-balance-section">
                            <h5 className="home-my-absence-balance">My absence balance</h5>
                            <hr />
                            <h6 className="home-my-absence-balance-type">Type</h6>
                            <h6 className="home-my-absence-balance-paid-leave">Paid Leave</h6>
                            <h6 className="home-my-absence-balance-balance">Balance</h6>
                            <h6 className="home-my-absence-balance-balance-days">{user?.holidayDaysRemaining} day/s</h6>
                            <CalendarView userId={user?.id} />
                        </div>
                        : <></>}
                </>
                : <p className='no-products'>{authenticationConstants.PleaseRegisterOrLogin}</p>
            }
        </section>
    );
}

export default Home;