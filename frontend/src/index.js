import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Signup from '../src/components/Signup'
import Login from './components/Login';
import { AddTest } from './components/AddTest';
import Home from './components/admin/Home';
import PostJob from './components/admin/PostJob';
import ViewJob from './components/ViewJob';
import ApplyJob from './components/ApplyJob';
import ViewApplicants from './components/admin/ViewApplicants';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
  {path:'/signup',element:<Signup/>},
  {path:'/',element:<App/>},
  {path:'/login',element:<Login/>},
  {path:'/add',element:<AddTest/>},
  {path:'/view/:id',element:<ViewJob/>},
  {path:'/apply/:id',element:<ApplyJob/>},

  //admin
  {path:'/admin/home',element:<Home/>},
  {path:'/admin/addJob',element:<PostJob/>},
  {path:'//admin/viewApplicants/:id',element:<ViewApplicants/>}
])
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

