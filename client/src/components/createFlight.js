import React from "react";
import axios from "axios";

class CreateFlight extends React.Component {
    constructor(){
        super();
        this.state = {
            from:'',
            to:'',
            flightNumber:'',
            flightDate:'',
            departureTime:'',
            arrivalTime:'',
            seatsAvailable:'',
            cabin:'',
            totalSeats:'',
            airplaneType:'',
            duration:'',
            airline:'',
            hasTransit: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
    e.preventDefault();

    const data = {
      from: this.state.from,
      to: this.state.to,
      flightNumber: this.state.flightNumber,
      flightDate: this.state.flightDate,
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
      seatsAvailable: this.state.seatsAvailable,
      cabin: this.state.cabin,
      totalSeats: this.state.totalSeats,
      airplaneType: this.state.airplaneType,
      duration: this.state.duration,
      airline: this.state.airline,
      hasTransit: this.state.hasTransit
    }; 
    axios
      .post('http://localhost:8000/api/flights', data)
      .then(res => {
        this.setState({
            from:'',
            to:'',
            flightNumber:'',
            flightDate:'',
            departureTime:'',
            arrivalTime:'',
            seatsAvailable:'',
            cabin:'',
            totalSeats:'',
            airplaneType:'',
            duration:'',
            airline:'',
            hasTransit: false
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

    render() { 
        return (<>
              <h1>
                  Create a new flight
              </h1>

              <form noValidate onSubmit={this.onSubmit}>
                <div>
                  <input
                    type='text'
                    placeholder='From..'
                    name='from'
                    value={this.state.from}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='To..'
                    name='to'
                    value={this.state.to}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='number'
                    placeholder='Flight Number'
                    name='flightNumber'
                    value={this.state.flightNumber}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='date'
                    placeholder='Flight Date'
                    name='flightDate'
                    value={this.state.flightDate}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='Departure Time'
                    name='departureTime'
                    value={this.state.departureTime}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Arrival Time'
                    name='arrivalTime'
                    value={this.state.arrivalTime}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='number'
                    placeholder='Seats Available'
                    name='seatsAvailable'
                    value={this.state.seatsAvailable}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Cabin'
                    name='cabin'
                    value={this.state.cabin}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='Total Seats'
                    name='totalSeats'
                    value={this.state.totalSeats}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Airplane Type'
                    name='airplaneType'
                    value={this.state.airplaneType}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='Duration'
                    name='duration'
                    value={this.state.duration}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Airline'
                    name='airline'
                    value={this.state.airline}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                    Please check if this flight has a transit 
                  <input
                    type='checkbox'
                    onChange={(e) => {
                                this.onChange({
                                  target: {
                                    name: "hasTransit",
                                    value: e.target.checked?true:false
                                  },
                          });}} />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </>
    );
    }
}
 
export default CreateFlight;