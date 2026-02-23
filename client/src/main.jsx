import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Initialize AOS in a separate component
const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      delay: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return null; // This component does not render anything
};

// Render the RouterProvider and initialize AOS
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <AOSInitializer />
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);
