

import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ServiceDetail from './Pages/ServiceDetail';
import LogIn from './Pages/LogIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Pages/Register';
import Service from './Pages/Service';
import Booking from './Pages/Booking';
import Profile from './Pages/Profile'
import Blogs from './Pages/Blogs';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import BlogDetails from './Pages/BlogDetails';
import { useEffect } from 'react';
import { check_token } from './Redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';

AOS.init();

// Create a client
const queryClient = new QueryClient()

function App() {
  const dispatch=useDispatch()
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    return token !== null && token !== undefined ? children : <><Navigate to="/" /> {toast.error('Kindly log in to view this')}</>
  }

  const Public_Route = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/home',
      component: <Home />
    },
    {
      path: '/service',
      component: <Service />
    },
    {
      path: '/login',
      component: <LogIn />
    },
    {
      path: '/register',
      component: <Register />
    },
    {
      path: '/profile',
      component: <Profile />
    }
  ]

  const Private_Route = [
    {
      path: '/bookService/:id',
      component: <Booking />
    },
    {
      path: '/blog',
      component: <Blogs />
    },
    {
      path: '/serviceDetail/:id',
      component: <ServiceDetail />
    },
    {
      path: '/blogDetail/:id',
      component: <BlogDetails />
    }
  ]

  useEffect(() => {
    dispatch(check_token())
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Router>
          <Routes>
            {Public_Route.map((item, index) => (
              <Route key={index} path={item.path} element={item.component} />
            ))}
            {Private_Route.map((item, index) => (
              <Route key={index} path={item.path} element={<ProtectedRoute>{item.component}</ProtectedRoute>} />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
