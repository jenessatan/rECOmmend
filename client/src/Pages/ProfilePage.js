import React from 'react';
import UserDashboard from '../Components/UserDashboard';
import BusinessDashboard from '../Components/BusinessDashboard';


function ProfilePage() {
<<<<<<< HEAD
  console.log(window.localStorage.usertype);
=======
>>>>>>> profile edit form and update login credential storage
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