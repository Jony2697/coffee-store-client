import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Users from './components/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch('https://coffee-store-server-weld-three.vercel.app/coffees'),
        Component: Home
      },
      {
        path: '/addCoffee',
        Component: AddCoffee
      },
      {
        path: '/coffee/:id',
        loader: ({ params }) => fetch(`https://coffee-store-server-weld-three.vercel.app/coffees/${params.id}`),
        Component: CoffeeDetails
      },
      {
        path: '/updateCoffee/:id',
        loader: ({ params }) => fetch(`https://coffee-store-server-weld-three.vercel.app/coffees/${params.id}`),
        Component: UpdateCoffee,
      },
      {
        path: '/signIn',
        Component: SignIn
      },
      {
      path:'/signUp',
      Component:SignUp
      },
      {
        path:'/users',
        loader:()=>fetch('https://coffee-store-server-weld-three.vercel.app/users'),
        Component:Users
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
