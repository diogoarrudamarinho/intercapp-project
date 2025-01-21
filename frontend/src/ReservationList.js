import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './styles.css'; // Import the new styles.css

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [], isLoading: true };
  }

  async componentDidMount() {
    const response = await fetch('/reservations/student/1'); // Replace with dynamic student ID
    if (response.ok) {
      const body = await response.json();
      this.setState({ reservations: body, isLoading: false });
    } else {
      console.error('Failed to fetch reservations:', response.statusText);
    }
  }

  async cancel(id) {
    await fetch(`/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedReservations = [...this.state.reservations].filter(i => i.id !== id);
      this.setState({ reservations: updatedReservations });
    });
  }

  render() {
    const { reservations, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const reservationList = reservations.map(reservation => {
      return <tr key={reservation.id}>
        <td>{reservation.seatId}</td>
        <td>{reservation.reservationDate}</td>
        <td>
          <Button size="sm" color="danger" onClick={() => this.cancel(reservation.id)}>Cancel</Button>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <h3>Reservations</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Seat ID</th>
                <th width="40%">Reservation Date</th>
                <th width="30%">Actions</th>
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