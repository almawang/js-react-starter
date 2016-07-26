import React from 'react';
import * as firebasedb from './firebasedb';

const Login = (props) => {
  firebasedb.startAuth();
  return (
    <div id="firebaseui-auth-container" />
  );
};

export default Login;
