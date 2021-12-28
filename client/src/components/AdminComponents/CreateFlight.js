import React from "react";
import axios from "axios";
import DropDown from "./ModelsDropDownList";
import {
  Button,
  TextField,
  Grid,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from "@mui/material";
import MyButton from "../Button"

const theme = createTheme();

class CreateFlight extends React.Component {
  constructor() {
    super();
    this.state = {
      flightNumber: 0,
      departure: {
        airport: "",
        terminal: "",
        time: null,
      },
      arrival: {
        airport: "",
        terminal: "",
        time: null,
      },
      airline: "",
      hasTransit: false,
      airplaneModelID: "",
      economyCabin: {
        takenSeats: [],
        adultPrice: 0,
        adultBaggage: 0,
        childPrice: 0,
        childBaggage: 0,
      },
      businessCabin: {
        takenSeats: [],
        adultPrice: 0,
        adultBaggage: 0,
        childPrice: 0,
        childBaggage: 0,
      },
      firstCabin: {
        takenSeats: [],
        adultPrice: 0,
        adultBaggage: 0,
        childPrice: 0,
        childBaggage: 0,
      },
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  departureOnChange = (e) => {
    this.setState({
      departure: { ...this.state.departure, [e.target.name]: e.target.value },
    });
  };

  arrivalOnChange = (e) => {
    this.setState({
      arrival: { ...this.state.arrival, [e.target.name]: e.target.value },
    });
  };

  economyOnChange = (e) => {
    this.setState({
      economyCabin: {
        ...this.state.economyCabin,
        [e.target.name]: e.target.value,
      },
    });
  };

  businessOnChange = (e) => {
    this.setState({
      businessCabin: {
        ...this.state.businessCabin,
        [e.target.name]: e.target.value,
      },
    });
  };

  firstOnChange = (e) => {
    this.setState({
      firstCabin: { ...this.state.firstCabin, [e.target.name]: e.target.value },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      flightNumber: this.state.flightNumber,
      departure: this.state.departure,
      arrival: this.state.arrival,
      airline: this.state.airline,
      hasTransit: this.state.hasTransit,
      airplaneModelID: this.state.airplaneModelID,
      economyCabin: this.state.economyCabin,
      businessCabin: this.state.businessCabin,
      firstCabin: this.state.firstCabin,
    };
    axios
      .post("http://localhost:8000/api/flights", data, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.setState({
          flightNumber: 0,
          departure: {
            airport: "",
            terminal: "",
            time: null,
          },
          arrival: {
            airport: "",
            terminal: "",
            time: null,
          },
          airline: "",
          hasTransit: false,
          airplaneModelID: "",
          economyCabin: {
            takenSeats: [],
            adultPrice: 0,
            adultBaggage: 0,
            childPrice: 0,
            childBaggage: 0,
          },
          businessCabin: {
            takenSeats: [],
            adultPrice: 0,
            adultBaggage: 0,
            childPrice: 0,
            childBaggage: 0,
          },
          firstCabin: {
            takenSeats: [],
            adultPrice: 0,
            adultBaggage: 0,
            childPrice: 0,
            childBaggage: 0,
          },
          message: "",
        });
        this.setState({
          message: "Flight Created Successfully You will be redirected shortly",
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      })
      .catch((err) => {
        this.setState({ message: "Enter Valid Data" });
      });
  };

  render() {
    return (
      <>
        <br></br>
        <div className="list " style={{
  paddingBottom : "100px",
  width : "50%",
  marginTop : "50px"
}}>
        <div className="settings" style={{
          justifyContent : "center",
          alignContent : "center",
          alignItems : "center"
        }}>

        <div
          className="TripTitleDiv"
          style={{
            height: "130px",
            marginBottom: "20px",
            paddingBottom: "50px",
          }}
        >
           <div class="TripTitleText">Create Flight</div>
          <img class="Trip-bg" src="admin.jpg" style = {{
            left : "400px",
            opacity : "0.7",top:-120
          }}/>
        </div>
        </div>
        <br></br>
        
        <Box
                        component="span"
                        border={2}
                        borderRadius={4}
                        borderLeft={1}
                        borderRight={1}
                        borderColor="#a9a9a9"
          sx={{
            marginBottom:-10,
            marginTop: -5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        >
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Box
                component="form"
                sx={{ mt: 3 }}
                noValidate
                onSubmit={this.onSubmit}
              >
                <br></br>
                {/* Flight Number:
                <div>
                  <input
                    type='number'
                    placeholder='Flight Number'
                    name='flightNumber'
                    value={this.state.flightNumber}
                    onChange={this.onChange}
                  />
                </div> */}

                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Flight Number"
                    name="flightNumber"
                    onChange={this.onChange}
                    fullWidth
                  />
                </Grid>

                <div>
                  <hr />
                  Departure Details
                  <br />
                  <br />
                  {/* Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      value={this.state.departure.airport}
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Airport"
                      name="airport"
                      onChange={this.departureOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      value={this.state.departure.terminal}
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Terminal"
                      name="terminal"
                      onChange={this.departureOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      value={this.state.departure.time
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="datetime-local"
                      placeholder="Time"
                      name="time"
                      onChange={this.departureOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  <hr />
                </div>

                <div>
                  Arrival Details
                  <br />
                  <br />
                  {/* Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      value={this.state.arrival.airport}
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Airport"
                      name="airport"
                      onChange={this.arrivalOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      value={this.state.arrival.terminal}
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Terminal"
                      name="terminal"
                      onChange={this.arrivalOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      value={this.state.arrival.time}
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="datetime-local"
                      placeholder="Time"
                      name="time"
                      onChange={this.arrivalOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  <hr />
                </div>

                {/* Airline:
                <div>
                  <input
                    type='text'
                    placeholder='Airline'
                    name='airline'
                    value={this.state.airline}
                    onChange={this.onChange}
                  />
                </div> */}

                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Airline"
                    name="airline"
                    onChange={this.onChange}
                    fullWidth
                  />
                </Grid>
                <br />

                <div>
                  Has transit?
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      this.onChange({
                        target: {
                          name: "hasTransit",
                          value: e.target.checked ? true : false,
                        },
                      });
                    }}
                  />
                </div>

                <div>
                  Flight Model:
                  <br />
                  <DropDown name="airplaneModelID" onChange={this.onChange} />
                </div>

                <div>
                  <hr />
                  Economy Cabin Details
                  <br />
                  <br />
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.economyCabin.adultPrice}
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Adult Price"
                      name="adultPrice"
                      onChange={this.economyOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.economyCabin.adultBaggage}
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum adult baggage"
                      name="adultBaggage"
                      onChange={this.economyOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.economyCabin.childPrice}
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Child Price"
                      name="childPrice"
                      onChange={this.economyOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.economyCabin.childBaggage}
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum child baggage"
                      name="childBaggage"
                      onChange={this.economyOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                </div>

                <div>
                  <hr />
                  Business Cabin Details
                  <br />
                  <br />
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.businessCabin.adultPrice}
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Adult Price"
                      name="adultPrice"
                      onChange={this.businessOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.businessCabin.adultBaggage}
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum adult baggage"
                      name="adultBaggage"
                      onChange={this.businessOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.businessCabin.childPrice}
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Child Price"
                      name="childPrice"
                      onChange={this.businessOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.businessCabin.childBaggage}
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum child baggage"
                      name="childBaggage"
                      onChange={this.businessOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                </div>

                <div>
                  <hr />
                  First Class Cabin Details
                  <br /> <br />
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.firstCabin.adultPrice}
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Adult Price"
                      name="adultPrice"
                      onChange={this.firstOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.firstCabin.adultBaggage}
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum adult baggage"
                      name="adultBaggage"
                      onChange={this.firstOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.firstCabin.childPrice}
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Child Price"
                      name="childPrice"
                      onChange={this.firstOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.firstCabin.childBaggage}
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Maximum child baggage"
                      name="childBaggage"
                      onChange={this.firstOnChange}
                      fullWidth
                    />
                  </Grid>
                  <br />
                  <hr />
                </div>

                <Grid>
                  <label
                    style={{
                      font: "20px Montserrat",
                      color: "rgba(200,50,50,0.8)",
                    }}
                  >
                    {this.state.message}
                  </label>
                  <br />
                  <Grid style={{padding:10}}>
              <MyButton
              index={1}
              label = "Create Flight"
              onClick={this.onSubmit}
            />
            </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        </Box>
        </div>
        <br></br>
      </>
    );
  }
}

export default CreateFlight;
