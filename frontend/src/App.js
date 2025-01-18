import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    students: []
  };

  async componentDidMount() {
    const response = await fetch('/students');
    const body = await response.json();
    this.setState({students: body});
  }

  render() {
    const {students} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Estudantes</h2>
              {students.map(student =>
                  <div key={student.id}>
                    {student.name} ({student.mail})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;
