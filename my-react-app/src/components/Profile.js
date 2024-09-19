import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../ApiCaller'; // Assuming these functions are in ApiCaller.js

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(); // Assume this fetches user profile details
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      await updateUserProfile(userDetails); // Assume this sends updated details to the server
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  // Inline styles for the profile page
  const containerStyle = {
    maxWidth: '500px',
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
    marginBottom: '10px',
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
      <h2>User Profile</h2>
      {message && <p>{message}</p>}
      
      <div style={formGroupStyle}>
        <label htmlFor="username" style={labelStyle}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
          style={inputStyle}
          disabled={!isEditing}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          style={inputStyle}
          disabled={!isEditing}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="phone" style={labelStyle}>Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={userDetails.phone}
          onChange={handleChange}
          style={inputStyle}
          disabled={!isEditing}
        />
      </div>

      {isEditing ? (
        <button onClick={handleSave} style={buttonStyle}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)} style={buttonStyle}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
