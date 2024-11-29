import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import NotFound from './pages/NotFound';
import EmployeeList from './pages/admin/products/EmployeeList';
import CreateEmployee from './pages/admin/products/CreateEmployee';
import EditEmployee from './pages/admin/products/EditEmployee';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const location = useLocation();

  // Exclude Navbar and Footer only on specific paths
  const noNavbarFooter = ["/", "/home"].includes(location.pathname);

  return (
    <>
      {!noNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/admin/employees/create" element={<CreateEmployee />} />
        <Route path="/admin/employees/edit/:id" element={<EditEmployee />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!noNavbarFooter && <Footer />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
