import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword'; // Import ResetPassword component
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/reset-password">Reset Password</Link> {/* Add link for Reset Password */}
            </li>
            <li>
              <Link to="/forgot-password">Forgot Password</Link> {/* Add link for Reset Password */}
            </li>
          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Add reset password route */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add reset password route */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;
