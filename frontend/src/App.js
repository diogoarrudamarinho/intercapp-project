import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';
import Home from './Home';
import AppNavbar from './AppNavbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/schedules' element={<ScheduleList />} />
          <Route path='/schedules/:id' element={<ScheduleEdit />} />
        </Routes>
      </Router>
    );
  }
}

export default App;