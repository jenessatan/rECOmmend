import React from 'react';
import UserDashboard from '../Components/UserDashboard';
import BusinessDashboard from '../Components/BusinessDashboard';


function ProfilePage() {
  if(window.localStorage.user-type === 'business') {
    return (
      <BusinessDashboard />
    )
  } else {
    return (
      <UserDashboard />
    );
  }
}

export default ProfilePage;