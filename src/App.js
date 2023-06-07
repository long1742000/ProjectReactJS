import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';

import {
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './components/LoginPage';

function App() {


  return (
    <div className="app-container">
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/users' element={<TableUser />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}

export default App;
