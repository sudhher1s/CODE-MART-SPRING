import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    profileImage: user?.profileImage || '',
  });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?.id) {
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await authAPI.updateUser(user.id, formData);
      updateUserProfile(response.data);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed:', error);
      setMessage('Profile update failed');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">Please <Link to="/login">login</Link> to view profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="profile-role">Role: {user.role}</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Email</label>
          <input value={user.email} disabled />

          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />

          <label>Profile Image URL</label>
          <input name="profileImage" value={formData.profileImage} onChange={handleChange} />

          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>

        {!!message && <p className="profile-message">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
