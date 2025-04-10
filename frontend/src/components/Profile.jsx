import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import maverick from '../assets/images/maverick.png';
import '../styles/Profile.css';

const Profile = ({ email }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(maverick); // Default to maverick.png
  const fileInputRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/${email}`);
        if (response.data) {
          setUserData({
            name: response.data.name,
            idNumber: response.data.idNumber.trim(),
            role: response.data.role
          });
          // Only set profile image if one exists in database
          if (response.data.profileImage) {
            const imageUrl = response.data.profileImage.includes('http')
              ? response.data.profileImage
              : `${API_URL}/uploads/${response.data.profileImage.replace(/\\/g, '/')}`;
            setProfileImage(imageUrl);
          } else {
            setProfileImage(maverick); // Explicitly set to default if no image
          }
        } else {
          setError("User data not found");
          setProfileImage(maverick); // Default if no user data
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.response?.data?.message || 'Failed to fetch profile data');
        setProfileImage(maverick); // Default on error
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    } else {
      setError("No email provided");
      setProfileImage(maverick); // Default if no email
      setLoading(false);
    }
  }, [email, API_URL]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await axios.post(
        `${API_URL}/api/upload-profile-image/${email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imagePath = response.data?.imagePath;
      if (!imagePath) {
        throw new Error('Server did not return image path');
      }

      const imageUrl = `${API_URL}/uploads/${imagePath.replace(/\\/g, '/')}`;
      setProfileImage(imageUrl);
      
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
      setProfileImage(maverick); // Revert to default on upload failure
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={profileImage} alt="Loading" />
      </div>
      <div className="profile-inner-box">Loading profile...</div>
    </div>
  );

  if (error) return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={profileImage} alt="Error" />
      </div>
      <div className="profile-inner-box">Error: {error}</div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={profileImage} alt="User avatar" />
        <button className="upload-button" onClick={triggerFileInput}>
          <svg 
            className="plus-icon" 
            viewBox="0 0 24 24"
            width="20" 
            height="20"
          >
            <circle cx="12" cy="12" r="10" fill="#F38223" />
            <path 
              d="M12 8v8M8 12h8" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <div className="profile-inner-box">
        {userData && (
          <>
            <div className="profile-item"><strong>Name:</strong> {userData.name}</div>
            <div className="profile-item"><strong>ID Number:</strong> {userData.idNumber}</div>
            <div className="profile-item"><strong>Role:</strong> {userData.role}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;