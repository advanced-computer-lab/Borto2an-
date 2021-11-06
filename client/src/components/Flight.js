import React from 'react'


function Flight({ flightNumber, from, to, airline, flightDate }) {
  return (
    <>
    <tr style={{ background: "#dddddd" }}>
      <td style={{ padding: "15px" }}> {flightNumber}</td>
      <td style={{ padding: "15px" }}> {from}</td>
      <td style={{ padding: "15px" }} >{to}</td>
      <td style={{ padding: "15px" }}>{airline}</td>
      <td style={{ padding: "15px" }} >{flightDate}</td>
    
      <button style={{ margin: "15px" }} >
        Show All Details
      </button >
    </tr>
    </>

  )
}

export default Flight
