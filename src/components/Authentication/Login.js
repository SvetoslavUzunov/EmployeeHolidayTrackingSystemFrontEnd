import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authService from '../../services/authenticationService';
import * as authenticationConstants from '../../constants/authenticationConstants';
import welcomeIcon from '../.././images/welcomeIcon.jpg';

const Login = () => {
    const { login } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const onLoginHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        authService.loginAsync(email, password)
            .then((authData) => {
                login(authData);
                navigate('/home');
                addNotification(authenticationConstants.SuccessfullyLogin, types.success);
            })
            .catch(error => {
                addNotification(authenticationConstants.FailedLogin, types.error);
                console.log(error);
            });
    };

    return (
        <>
            <img src={welcomeIcon} alt='welcome icon' className='welcomeIcon' />
            <section id="login-page" className="login">
                <form id="login-form" onSubmit={onLoginHandler} method="POST">
                    <fieldset>
                        <legend>Login</legend>
                        <p className="field">
                            <label htmlFor="email">Email</label>
                            <span className="input">
                                <input type="text" name="email" id="email" placeholder="Email" />
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="password">Password</label>
                            <span className="input">
                                <input type="password" name="password" id="password" placeholder="Password" />
                            </span>
                        </p>
                        <input className="button submit" type="submit" value='Login' />
                        <p className='create-new-account'>You don't have an account yet?</p><Link to={'/register'}>Create an account.</Link>
                    </fieldset>
                </form>
            </section>
        </>
    );
}

export default Login;