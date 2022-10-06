import React from 'react';

import FirstLogin from '../LoginPage/FirstLogin';
import Login from '../LoginPage/LoginPage';
import MyAssignment from '../HomePage/MyAssignment';
function HomePage() {
  return (
    <div>
      {localStorage.getItem('token') ? (
        localStorage.getItem('isFirstLogin') === 'True' ? (
          <FirstLogin />
        ) : (
          <MyAssignment />
        )
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
export default HomePage;
