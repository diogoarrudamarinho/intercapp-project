import React, { Component } from 'react';
import { Container, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import AppNavbar from './AppNavbar';
import './styles.css';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: [], isLoading: true, modal: false, selectedSchedule: null };
    this.toggle = this.toggle.bind(this);
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

  toggle(schedule) {
    this.setState({
      modal: !this.state.modal,
      selectedSchedule: schedule
    });
  }

  render() {
    const { schedules, isLoading, modal, selectedSchedule } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const scheduleList = schedules.map(schedule => {
      return <div key={schedule.id} className="card hoverable" onClick={() => this.toggle(schedule)}>
        <div className="rota">{schedule.route}</div>
        <div className="horario">{schedule.departureTime} - {schedule.arrivalTime}</div>
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
        {selectedSchedule && (
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Schedule Details</ModalHeader>
            <ModalBody>
              <p><strong>Route:</strong> {selectedSchedule.route}</p>
              <p><strong>Departure Time:</strong> {selectedSchedule.departureTime}</p>
              <p><strong>Arrival Time:</strong> {selectedSchedule.arrivalTime}</p>
              <p><strong>Bus:</strong> {selectedSchedule.bus.model} ({selectedSchedule.bus.plate})</p>
              <p><strong>Estimated Times:</strong></p>
              <ul>
                {Object.entries(selectedSchedule.estimatedTimes).map(([point, time]) => (
                  <li key={point}>{point} - {time}</li>
                ))}
              </ul>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}

export default ScheduleList;