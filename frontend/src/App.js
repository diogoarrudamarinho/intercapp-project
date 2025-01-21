import React, { Component } from 'react';
import './styles.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';
import Home from './Home';
import AppNavbar from './AppNavbar';
import LoginWithRouter from './Login';
import RegisterWithRouter from './Register';
import BusList from './BusList';
import ReservationList from './ReservationList';
import ReservationEditWithRouter from './ReservationEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginWithRouter />} />
          <Route path='/login' element={<LoginWithRouter />} />
          <Route path='/register' element={<RegisterWithRouter />} />
          <Route path='/home' element={<Home />} />
          <Route path='/schedules' element={<ScheduleList />} />
          <Route path='/schedules/:id' element={<ScheduleEdit />} />
          <Route path='/buses' element={<BusList />} />
          <Route path='/reservations' element={<ReservationList />} />
          <Route path='/reservations/:id' element={<ReservationEditWithRouter />} />
          
        </Routes>
      </Router>
    );
  }
}

export default App;