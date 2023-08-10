import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as authenticationConstants from '../../constants/authenticationConstants';

const Header = () => {
    const { auth } = useAuthContext();

    let adminView = (
        <div id="admin">
            <Link to="./home" className="button">Home</Link>
            <Link to="./all-users" className="button">All Employees</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let supervisorView = (
        <div id="supervisor">
            <Link to="./home" className="button">Home</Link>
            <Link to="./requests" className="button">Requests</Link>
            <Link to="./all-users" className="button">All Employees</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let employeeView = (
        <div id="employee">
            <Link to="./home" className="button">Home</Link>
            <Link to="./my-requests" className="button">My Requests</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let guestView = (
        <div id="guest">
            <Link to="./login" className="button">Login</Link>
            <Link to="./register" className="button">Register</Link>
        </div>
    );

    const renderView = () => {
        if (auth.role == authenticationConstants.AdminRole) {
            return adminView;
        } else if (auth.role == authenticationConstants.SupervisorRole) {
            return supervisorView;
        } if (auth.accessToken) {
            return employeeView;
        }
        return guestView;
    }

    return (
        <>
            {auth.accessToken ?
                <header id="site-header">
                    <nav className="navbar">
                        <section className="navbar-dashboard">
                            {renderView()}
                        </section>
                    </nav>
                </header>
                : <></>}
        </>
    );
}

export default Header;