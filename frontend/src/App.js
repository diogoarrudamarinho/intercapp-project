import React, { Component } from 'react';
import './styles.css';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';
import Home from './Home';
import AppNavbar from './AppNavbar';
import LoginWithRouter from './Login';
import RegisterWithRouter from './Register';
import BusList from './BusList';
import ReservationList from './ReservationList';
import ReservationEditWithRouter from './ReservationEdit';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginWithRouter />} />
            <Route path='/register' element={<RegisterWithRouter />} />
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/schedules' element={<PrivateRoute><ScheduleList /></PrivateRoute>} />
            <Route path='/schedules/:id' element={<PrivateRoute><ScheduleEdit /></PrivateRoute>} />
            <Route path='/buses' element={<PrivateRoute><BusList /></PrivateRoute>} />
            <Route path='/reservations' element={<PrivateRoute><ReservationList /></PrivateRoute>} />
            <Route path='/reservations/:id' element={<PrivateRoute><ReservationEditWithRouter /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;