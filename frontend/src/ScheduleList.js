import React, { Component } from 'react';
import { Container, Modal, ModalHeader, ModalBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './styles.css';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = { schedules: [], isLoading: true, modal: false, selectedSchedule: null, seats: [], showSeats: false };
    this.toggle = this.toggle.bind(this);
    this.fetchSeats = this.fetchSeats.bind(this);
    this.handleSeatClick = this.handleSeatClick.bind(this);
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

  toggle(schedule = null) {
    this.setState({
      modal: !this.state.modal,
      selectedSchedule: schedule,
      showSeats: false,
      seats: []
    });
  }

  async fetchSeats(busId) {
    const response = await fetch(`/buses/${busId}/seats`);
    if (response.ok) {
      const body = await response.json();
      this.setState({ seats: body.seats, showSeats: true });
    } else {
      console.error('Failed to fetch seats:', response.statusText);
    }
  }

  async handleSeatClick(seatId) {
    const { selectedSchedule } = this.state;
    const studentId = 1; // Replace with dynamic student ID

    const response = await fetch(`/reservations/${studentId}/reservations/${seatId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Reservation successful!');
      this.toggle();
    } else {
      console.error('Failed to create reservation:', response.statusText);
    }
  }

  render() {
    const { schedules, isLoading, modal, selectedSchedule, seats, showSeats } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const scheduleList = schedules.map(schedule => {
      return (
        <div key={schedule.id} className="card hoverable" onClick={() => this.toggle(schedule)}>
          <div className="rota">{schedule.route}</div>
          <div className="horario">{schedule.departureTime} - {schedule.arrivalTime}</div>
        </div>
      );
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
          <Modal isOpen={modal} toggle={() => this.toggle()}>
            <ModalHeader toggle={() => this.toggle()}>Schedule Details</ModalHeader>
            <ModalBody>
              <p><strong>Route:</strong> {selectedSchedule.route}</p>
              <p><strong>Departure Time:</strong> {selectedSchedule.departureTime}</p>
              <p><strong>Arrival Time:</strong> {selectedSchedule.arrivalTime}</p>
              {selectedSchedule.bus && (
                <p><strong>Bus:</strong> {selectedSchedule.bus.model} ({selectedSchedule.bus.plate})</p>
              )}
              <p><strong>Estimated Times:</strong></p>
              <ul>
                {selectedSchedule.estimatedTimes && Object.entries(selectedSchedule.estimatedTimes).map(([point, time]) => (
                  <li key={point}>{point} - {time}</li>
                ))}
              </ul>
              {showSeats && (
                <ListGroup>
                  {seats.map(seat => (
                    <ListGroupItem key={seat.id} onClick={() => this.handleSeatClick(seat.id)}>
                      Seat {seat.number}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
              <Button color="secondary" tag={Link} to={`/reservations/new?busId=${selectedSchedule.busId}`}>Reservar assento</Button>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}

export default ScheduleList;