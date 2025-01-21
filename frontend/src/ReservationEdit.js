import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './styles.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ReservationEdit = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const busId = query.get('busId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await fetch(`/buses/${busId}/seats`);
      if (response.ok) {
        const body = await response.json();
        setSeats(body.seats);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch seats:', response.statusText);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleChange = (event) => {
    setSelectedSeat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentId = 1; // Replace with dynamic student ID

    const response = await fetch(`/reservations/${studentId}/reservations/${selectedSeat}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Reservation successful!');
      navigate('/schedules');
    } else {
      console.error('Failed to create reservation:', response.statusText);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppNavbar />
      <Container>
        <h2>Reservar Assento</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="seat">Selecione um Assento</Label>
            <Input type="select" name="seat" id="seat" value={selectedSeat} onChange={handleChange}>
              <option value="">Selecione...</option>
              {seats.map(seat => (
                <option key={seat.id} value={seat.id}>
                  Assento {seat.number}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">Reservar</Button>
        </Form>
      </Container>
    </div>
  );
};

export default ReservationEdit;