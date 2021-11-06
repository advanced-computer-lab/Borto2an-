import React from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";  
class SearchFlights extends React.Component {
  constructor() {
    super();
    this.state = {
      from: "",
      to: "",
      flightNumber: "",
      flightDate: "",
      departureTime: "",
      arrivalTime: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e, state) => {
    e.preventDefault();

    const data = this.getNonEmptyFields(state);
    console.log(data);

    axios({
      method: "get",
      url: "http://localhost:8000/api/flights/showAllflights",
      params: data,
    })
      .then((res) => {
        // go to search results component with the data
        console.log(res.data);
        this.props.history.push({
          pathname :"/search_results" , state:res.data
        })
        

      })
      .catch((err) => {
        console.log(err);
      });


  };

  getNonEmptyFields = (obj) => {
    const res = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) res[key] = value;
    }
    return res;
  };

  render() {

    return (
      <>

<header
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Search Flights Page
          </header>
          <br></br>
          <br></br>


        <form noValidate onSubmit={(e) => this.onSubmit(e, this.state)}>
          <div>
            <label>From: </label>
            <br />
            <input
              type="text"
              placeholder="Cairo"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>To: </label>
            <br />

            <input
              type="text"
              placeholder="Paris"
              name="to"
              value={this.state.to}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Flight Number: </label>
            <br />

            <input
              type="number"
              placeholder="Flight Number"
              name="flightNumber"
              value={this.state.flightNumber}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Flight Date: </label>
            <br />
            <input
              type="date"
              placeholder="Flight Date"
              name="flightDate"
              value={this.state.flightDate}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Time: </label>
            <br />
            <input
              type="text"
              placeholder="10 AM"
              name="departureTime"
              value={this.state.departureTime}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Arrival Time: </label>
            <br />
            <input
              type="text"
              placeholder="3 PM"
              name="arrivalTime"
              value={this.state.arrivalTime}
              onChange={this.onChange}
            />
          </div>
          <br>
          </br>

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
         
        </form>
        <br>
        </br>
        <button onClick={()=>{ 
          this.props.history.push('/all_flights')
        }}>View all flights</button>
      </>
    );
  }
}

export default SearchFlights;
