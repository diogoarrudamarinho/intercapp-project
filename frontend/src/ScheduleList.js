import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import './styles.css'; // Import the new styles.css

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: [], isLoading: true };
  }

  async componentDidMount() {
    const response = await fetch('/schedules');
    if (response.ok) {
      const body = await response.json();
      this.setState({ schedules: body, isLoading: false });
    } else {
      console.error('Failed to fetch schedules:', response.statusText);
    }
  }

  render() {
    const { schedules, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const scheduleList = schedules.map(schedule => {
      return <div key={schedule.id} className="card hoverable">
        <div className="horario">{schedule.horario}</div>
        <div className="rota">{schedule.rota}</div>
        <div className="dias">{schedule.dias}</div>
        <div className="detalhes">{schedule.detalhes}</div>
      </div>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <h3>Horários</h3>
          <div id="horarios">
            {scheduleList}
          </div>
        </Container>
      </div>
    );
  }
}

export default ScheduleList;