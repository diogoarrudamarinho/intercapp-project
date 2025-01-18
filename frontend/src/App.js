import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={ScheduleList}/>
          <Route path='/schedules' exact={true} component={ScheduleList}/>
          <Route path='/schedules/:id' component={ScheduleEdit}/>
        </Switch>
      </Router>
    );
  }
}

export default App;