import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './styles.css';

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [], isLoading: true };
    this.cancel = this.cancel.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/reservations/student/1'); 
    if (response.ok) {
      const body = await response.json();
      this.setState({ reservations: body, isLoading: false });
    } else {
      console.error('Failed to fetch reservations:', response.statusText);
    }
  }

  async cancel(id) {
    const response = await fetch(`/reservations/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      let updatedReservations = [...this.state.reservations].filter(i => i.id !== id);
      this.setState({ reservations: updatedReservations });
    } else {
      console.error('Failed to cancel reservation:', response.statusText);
    }
  }

  render() {
    const { reservations, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const reservationList = reservations.map(reservation => {
      return (
        <tr key={reservation.id}>
          <td>{reservation.id}</td>
          <td>{reservation.seatId}</td>
          <td>{reservation.reservationDate}</td>
          <td>{reservation.status ? 'Active' : 'Cancelled'}</td>
          <td>
            <Button size="sm" color="danger" onClick={() => this.cancel(reservation.id)}>Cancel</Button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <h3>My Reservations</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Seat ID</th>
                <th>Reservation Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservationList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ReservationList;