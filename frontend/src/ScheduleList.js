import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class ScheduleList extends Component {

    constructor(props) {
        super(props);
        this.state = {schedules: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/schedules');
        const body = await response.json();
        this.setState({schedules: body, isLoading: false});
    }

    async remove(id) {
        await fetch(`/schedules/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedSchedules = [...this.state.schedules].filter(i => i.id !== id);
            this.setState({schedules: updatedSchedules});
        });
    }

    render() {
        const {schedules, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const scheduleList = schedules.map(schedule => {
            return <tr key={schedule.id}>
                <td style={{whiteSpace: 'nowrap'}}>{schedule.route}</td>
                <td>{schedule.departureTime}</td>
                <td>{schedule.arrivalTime}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/schedules/" + schedule.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(schedule.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/schedules/new">Add Schedule</Button>
                    </div>
                    <h3>Schedules</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Route</th>
                            <th width="20%">Departure Time</th>
                            <th width="20%">Arrival Time</th>
                            <th width="30%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scheduleList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ScheduleList;