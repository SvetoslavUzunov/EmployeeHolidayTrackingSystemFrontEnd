import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from "./contexts/NotificationContext";
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Logout from "./components/Authentication/Logout";
import Notification from "./components/Common/Notification/Notification";
import Header from './components/WebSite/Header';
import Home from './components/WebSite/Home';
import AllUsers from './components/Users/AllUsers';
import Requests from './components/Users/Requests';
import MyAccount from './components/Users/MyAccount';
import MyRequests from './components/Users/My-Requests';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <div id='container'>
            <Header />
            <Notification />
            <main id="site-content">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path='/home' element={<Home />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path='/my-account' element={<MyAccount />} />
                <Route path='/requests' element={<Requests />} />
                <Route path='/my-requests' element={<MyRequests />} />
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
