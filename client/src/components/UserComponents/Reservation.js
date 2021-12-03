import React from 'react';
import {useHistory} from 'react-router-dom';


function Reservation({Reservation}) {

  const history = useHistory();

  function onClick(){history.push({pathname:"/reservation_details",state:Reservation});};
  
  return (
    <>
    <tr style={{ background: "#dddddd" }}>
        

       <td style={{ padding: "15px" }}> {Reservation.price}</td>


        <td style={{ padding: "15px" }}> {Reservation.departureFlight.flightId.departure.airport}</td>
        <td style={{ padding: "15px" }}> {Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}</td>

        
        <td style={{ padding: "15px" }}> {Reservation.returnFlight.flightId.arrival.airport}</td>
        <td style={{ padding: "15px" }}> {Reservation.returnFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.arrival.time.substring(11,16)}</td>


      
      <button className="showAllDetails" onClick ={onClick} >
        Show All Details
      </button >
    </tr>
    </>

  )
}

export default Reservation;