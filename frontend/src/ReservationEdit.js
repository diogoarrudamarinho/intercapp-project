import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './styles.css'; // Import the new styles.css

class ReservationEdit extends Component {
  emptyItem = {
    seatId: '',
    studentId: 1 // Replace with dynamic student ID
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      seats: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    const response = await fetch(`/buses/${id}/seats`);
    if (response.ok) {
      const body = await response.json();
      this.setState({ seats: body });
    } else {
      console.error('Failed to fetch seats:', response.statusText);
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const { navigate } = this.props;

    await fetch(`/reservations/${item.studentId}/reservations/${item.seatId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    navigate('/reservations');
  }

  render() {
    const { item, seats } = this.state;
    const title = <h2>Reserve a Seat</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="seatId">Seat</Label>
              <Input type="select" name="seatId" id="seatId" value={item.seatId || ''}
                onChange={this.handleChange} autoComplete="seatId">
                <option value="">Select a seat</option>
                {seats.map(seat => (
                  <option key={seat.id} value={seat.id}>{seat.number}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/reservations">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default function ReservationEditWithRouter(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <ReservationEdit {...props} params={params} navigate={navigate} />;
}