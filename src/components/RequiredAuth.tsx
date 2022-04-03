import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/authHandler';


export default ({children, ...rest}: any) =>{
   let logged = isLogged();
   
   let authorized = (rest.private && !logged) ? false : true;
   
   if(!authorized) {
      return <Navigate to="/signin" />; 
   }

   
   return children;
}
