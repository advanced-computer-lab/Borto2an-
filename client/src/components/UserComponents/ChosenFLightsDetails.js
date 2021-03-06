import React, { useState, useEffect } from "react";
import "./ChosenFlightsDetailsCSS.css";
import Button from "../Button.js";
import { useHistory } from "react-router-dom";
export default function ChosenFLightsDetails({
  firstFlight,
  secondFlight,
  adultNumber,
  childNumber,
}) {
  const getDefault = () => {
    return (
      <div className="flight">
        <label style={{ marginTop: "40px" }}>Choose a Flight</label>
      </div>
    );
  };
  const [flight1, setFlight1] = useState(getDefault());
  const [flight2, setFlight2] = useState(getDefault());
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const onClick = () => {
    if (index) {
      const data = {
        flight1: firstFlight.flight,
        flight2: secondFlight.flight,
        chosenCabin1: firstFlight.name,
        chosenCabin2: secondFlight.name,
        price1: getPriceOfFlight(firstFlight),
        price2: getPriceOfFlight(secondFlight),
        adultNumber,
        childNumber,
        duration1: firstFlight.duration,
        duration2: secondFlight.duration,
      };
      localStorage.setItem("flightSelectionData", JSON.stringify(data));
      localStorage.setItem("reservationSummary", null);
      localStorage.setItem("path", "http://localhost:3000/select_seats");
      window.dispatchEvent(new Event("storage"));
      history.push("/select_seats");
    }
  };

  useEffect(() => {
    if (firstFlight) setFlight1(getFlightHTML(firstFlight));
    if (secondFlight) setFlight2(getFlightHTML(secondFlight));
    if (firstFlight && secondFlight) {
      setIndex(1);
    }
  }, [firstFlight, secondFlight]);

  const getFlightHTML = (flight) => {
    return (
      <div className="planeContainer flex-row d-flex">
        <div style={{ margin: "auto", fontSize: "25px" }}>
          <label>Flight No. {flight.flight.flightNumber}</label>
          <br />
          <sub>
            {flight.flight.airplaneModelID.name.charAt(0).toUpperCase() +
              flight.flight.airplaneModelID.name.substring(1)}
          </sub>
          <br />
          <label>
            {flight.name.charAt(0).toUpperCase() + flight.name.substring(1)}
          </label>
        </div>
        <div style={{ margin: "auto" }}>
          <img src="egyptair.png" width="40" height="40" />
          <div>{getPriceOfFlight(flight)}</div>
        </div>
      </div>
    );
  };

  const getPriceOfFlight = (flight) => {
    console.log("get price ", flight);
    const adultPrice = flight.cabin.adultPrice * adultNumber;
    const childPrice = flight.cabin.childPrice * childNumber;
    return adultPrice + childPrice + " L.E";
  };

  return (
    <>
      {/* <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link> */}

      <div className="footer d-flex flex-row">
        {flight1}
        {flight2}
        <div className="button-holder">
          <Button
            index={index}
            width="250px"
            height="60px"
            label="Continue"
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
}
