// import React, { useState } from 'react';

// const Register = () => {
//   // State variables to store input values
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState(''); // State for phone number
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent form from refreshing the page

//     // Basic validation
//     if (!/^\d+$/.test(phone)) {
//       setError('Phone number should contain only numbers.');
//       return;
//     }

//     if (phone.length !== 10) {
//       setError('Phone number must be exactly 10 digits.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     // Clear error if validations pass
//     setError('');

//     // Submit the data (e.g., send to an API)
//     console.log('Username:', username);
//     console.log('Email:', email);
//     console.log('Phone:', phone); // Log the phone number
//     console.log('Password:', password);

//     // Reset form fields
//     setUsername('');
//     setEmail('');
//     setPhone(''); // Reset the phone number
//     setPassword('');
//     setConfirmPassword('');
//   };

//   // Inline styles
//   const containerStyle = {
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
//   };

//   const formGroupStyle = {
//     marginBottom: '15px',
//   };

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '5px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     boxSizing: 'border-box',
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '10px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={formGroupStyle}>
//           <label htmlFor="username" style={labelStyle}>Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </div>

//         <div style={formGroupStyle}>
//           <label htmlFor="email" style={labelStyle}>Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </div>

//         <div style={formGroupStyle}>
//           <label htmlFor="phone" style={labelStyle}>Phone Number:</label>
//           <input
//             type="tel"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             style={inputStyle}
//             pattern="\d*" // Restricts input to digits only
//             placeholder="1234567890"
//           />
//         </div>

//         <div style={formGroupStyle}>
//           <label htmlFor="password" style={labelStyle}>Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </div>

//         <div style={formGroupStyle}>
//           <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//         </div>

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <button type="submit" style={buttonStyle}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { register } from '../apis/ApiCaller';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation for phone number
    if (isNaN(phone)) {
      setError('Phone number must be numeric.');
      return;
    }

    try {
      // Call the register function from ApiCaller.js
      const response = await register({username,email,password,phone});
      
      // Check the response and handle success/failure
      if (response && response.success) { // Adjust this condition based on your API response structure
        setSuccessMessage('Registration successful!');
        setError('');
        // Redirect user or handle successful registration here
      } else {
        setError('Registration failed. Please check your details and try again.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      setSuccessMessage('');
    }
  };

  // Inline styles (same as before)
  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="phone" style={labelStyle}>Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        {/* {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}

        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

export default Register;

