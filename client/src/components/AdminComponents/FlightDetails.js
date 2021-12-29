import React from "react";
import axios from "axios";
import Flight from "./Flight";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, width } from "@mui/system";
import Stack from "@mui/material/Stack";
import logo from '../Logo/Logo.png';
import MyButton from "../Button"
import  {Grid} from "@mui/material";

class FlightDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      open: false,
      message:""
    };
  }

  componentDidMount() {
    if(!this.props.history.location.state)
    return;
    let curFlightNumber = {
      flightNumber: this.props.history.location.state.flightNumber,
    };
    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      params: curFlightNumber,
    })
      .then((res) => {
        this.setState({
          flights: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick(e, state) {
    if (typeof state.flight !== "undefined") {
      this.props.history.push("/update_flight", state);
    } else {
      console.log(state);
    }
  }
  render() {
    if(!this.props.history.location.state){
    this.props.history.push('/');
    return <></>;
    }
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    const handleDelete = () => {
      axios
        .delete(
          `http://localhost:8000/api/flights/${this.state.flights[0]?._id}`,{
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then(() => {
          console.log("deleted Successfully");
          this.setState({ message: "Flight Deleted Successfully" });
          setTimeout(() => {
            this.props.history.push("/");
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
        });
      this.setState({ open: false });
    };

    //important syntax : flightNumber is undefined problem occur when '?' is not in the code
    // the issue is state is by default {flight:[]} so there is no flight[0]
    // and you are trying to access flight[0].flightNumber
    // '?' means if the term before exists get from it the expression after '.'
    const state = {
      flightNumber: this.state.flights[0]?.flightNumber,
      flight: this.state.flights[0] ? this.state.flights[0] : undefined,
    };
    let flightlist;
    const flights = this.state.flights;
    if (!flights) {
      flightlist = "there is no such flight !";
    } else {
      flightlist = flights.map((flight) => (
        <div
      style={{backgroundImage: `url("https://i.pinimg.com/originals/48/7b/c1/487bc14012c5b2ceac9a29d8ed6406dd.jpg")` 
    }}
      >
         <Stack>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "left",
              }}
            >
              <Box
                component="span"
                border={2}
                borderRadius={10}
                borderLeft={2}
                borderRight={2}
                borderColor="#a9a9a9"
                sx={{ p:  5}}
                style={{
                  backgroundColor : "rgba(255, 255, 255, 0.85)",
                  width : "50%",
                  marginBottom : "10px"
                }}
              >
        <div>
          <div style={{
            fontSize:"16px",
            fontWeight: "bold",
            justifyContent:"space-around",
          }}>
                     <Stack direction = "row"
                     spacing={5}
                     style={{
                      justifyContent:"space-around",
                    }}>
                      <Stack direction="column" style={{
                      justifyContent:"space-around",
                    }}>
         <img src={logo} className="logo" alt="Logo" width="50px" height="50px"/>
         <label>
           Borto2an 
         </label>
         <label>
           Airline 
         </label>
         </Stack>
         <Stack direction="column" style={{
                      justifyContent:"space-around",
                    }}>
          Flight Number: {flight.flightNumber}
          </Stack>
          <Stack direction="column" style={{
                      justifyContent:"space-around",
                    }}>
          <img
                    src="takingOff2.png"
                    width="70px"
                    height="70px"
                  />
          <label style={{
            marginTop : "-4px"
          }}>
            {flight.airplaneModelID.name}
          </label>
                  </Stack>

                  </Stack>
          </div>
          <br/>
          <hr/>
          <Stack direction="row"
                       style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}>
          <div> 
          <div style={{
            fontSize:"14px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>           
          Departure Details:
          </div>
          <br/>
          Airport: {flight.departure.airport}
          <br/>
          Terminal: {flight.departure.terminal}
          <br/>
          Time: {flight.departure.time.substring(0, 10)+" at "+flight.departure.time.substring(11, 16)}
          <br/> 
          </div> 
          <div>
          <div style={{
            fontSize:"14px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}>        
          Arrival Details:
          </div>
          <br/>
          Airport: {flight.arrival.airport}
          <br/>
          Terminal: {flight.arrival.terminal}
          <br/>
          Time: {flight.arrival.time.substring(0, 10)+" at "+flight.arrival.time.substring(11, 16)}
          <br/>
          </div>  
          </Stack>
          
           <hr/>
          <Stack>
          <div style={{
            fontSize:"16px",
            fontWeight: "bold",
            justifyContent:"center",
            alignSelf:"center"
          }}>
          Economy Cabin Details:
          </div>
          </Stack>
          <br/>
          Size : {+flight.airplaneModelID.economyRows+" × "+flight.airplaneModelID.economyColumns}
          <br/>
          Adult Price: {flight.economyCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.economyCabin.adultBaggage}
          <br/>
          Child Price: {flight.economyCabin.childPrice}
          <br/>
          Child Baggage: {flight.economyCabin.childBaggage}
          <br/>
          Taken seats: {flight.economyCabin.takenSeats.slice(0, flight.economyCabin.takenSeats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      flight.economyCabin.takenSeats[
                        flight.economyCabin.takenSeats.length - 1
                      ]
                    }

          <br/> <hr/>

          <Stack>
          <div style={{
            fontSize:"16px",
            fontWeight: "bold",
            justifyContent:"center",
            alignSelf:"center"
          }}>
                   Business Cabin Details:
          </div>
          </Stack>
          <br/>
          Size : {+flight.airplaneModelID.businessRows+" × "+flight.airplaneModelID.businessColumns}
          <br/>
          Adult Price: {flight.businessCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.businessCabin.adultBaggage}
          <br/>
          Child Price: {flight.businessCabin.childPrice}
          <br/>
          Child Baggage: {flight.businessCabin.childBaggage}
          <br/>
          Taken seats: {flight.businessCabin.takenSeats.slice(0, flight.businessCabin.takenSeats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      flight.businessCabin.takenSeats[
                        flight.businessCabin.takenSeats.length - 1
                      ]
                    }
          <br/>
           <hr/>

           <Stack>
          <div style={{
            fontSize:"16px",
            fontWeight: "bold",
            justifyContent:"center",
            alignSelf:"center"
          }}>
                First Class Cabin Details:
          </div>
          </Stack>
          <br/>
          Size : {+flight.airplaneModelID.firstClassRows+" × "+flight.airplaneModelID.firstClassColumns}
          <br/>
          Adult Price: {flight.firstCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.firstCabin.adultBaggage}
          <br/>
          Child Price: {flight.firstCabin.childPrice}
          <br/>
          Child Baggage: {flight.firstCabin.childBaggage}
          <br/>
          
          Taken seats: {flight.firstCabin.takenSeats.slice(0, flight.firstCabin.takenSeats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      flight.firstCabin.takenSeats[
                        flight.firstCabin.takenSeats.length - 1
                      ]
                    }
          <br/>
           <hr/>
          
          <div>
          <div style={{
            justifyContent:"space-around",
          }}>

          <Stack spacing ={5} direction = "row" style={{
            justifyContent:"space-around",
          }}>
              <MyButton
              index={1}
              label = "Delete"
              onClick={handleClickOpen}
            />
             

<MyButton
              index={1}
              label = "Update"
              onClick={(e) => this.handleClick(e, state)}
            />

          
          </Stack>
          <Stack spacing ={5} direction = "row" style={{
            justifyContent:"space-around",mt:2
          }}>
          <label
                        style={{
                          font: "20px Montserrat",
                          color: "rgba(200,50,50,0.8)",
                          marginTop:"15px"
                        }}
                      >
                        {this.state.message}
                      </label>
          </Stack>
          </div>



            <Dialog
              open={this.state.open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action is irrevertable
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        </Box>
        </div>
     </Stack>
     </div>
      ));
    }

    
    return (
        <div>{flightlist}</div>
    );
  }
}

export default FlightDetails;