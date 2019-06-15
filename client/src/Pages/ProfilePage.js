import React from 'react';
import UserDashboard from '../Components/UserDashboard';
import BusinessDashboard from '../Components/BusinessDashboard';


function ProfilePage() {
  if(window.localStorage.usertype === 'business') {
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