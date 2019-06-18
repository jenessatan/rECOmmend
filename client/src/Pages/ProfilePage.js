import React from 'react';
import UserDashboard from '../Components/UserDashboard';
import BusinessDashboard from '../Components/BusinessDashboard';


function ProfilePage() {
  console.log(window.localStorage.usertype);
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