import axios from "axios";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import Model from "./Model";
import { Component } from "react";


import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../UserComponents/ReservationsCSS.css";

class AllFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      loading: true,
      minimumTime: false,
    };
  }

  getAllModels = () => {
    axios
      .get("http://localhost:8000/api/airplaneModel/showAllModels", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.setState({
          models: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllModels();
    setTimeout(() => {
      this.setState({ minimumTime: true });
    }, 1000);
  }

  deleteModel = (id) => {
    axios
      .delete("http://localhost:8000/api/airplaneModel/" + id, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.getAllModels();
        this.render();
      })
      .catch((err) => {
        alert("Error occurred in deletion");
      });
      this.setState({open:false});
  };

  render() {
    let modellist;
    const models = this.state.models;
    if (!models) {
      modellist = "there is no flight models !";
    } else {
      modellist = models.map((model) => (
        <Model
          _id={model._id}
          name={model.name}
          economyRows={model.economyRows}
          economyColumns={model.economyColumns}
          businessRows={model.businessRows}
          businessColumns={model.businessColumns}
          firstClassRows={model.firstClassRows}
          firstClassColumns={model.firstClassColumns}
          deleteModel={this.deleteModel}
        />
      ));
    }

    // const loadBody = (
    //   <Box
    //     sx={{
    //       width: "80%",
    //       margin: "auto",
    //       marginTop: 5,
    //       marginBottom: 5,
    //     }}
    //   >
    //     <Skeleton className="skeleton" />
    //     <Skeleton animation="wave" />
    //     <Skeleton animation={false} />
    //   </Box>
    // );
    // let tableBody =
    //   this.state.minimumTime && !this.state.loading ? modellist : loadBody;

    // // return (
    //   <section>
    //     <div class="tbl-header">
    //       <table>
    //         <th>Name</th>
    //         <th>Economy Rows</th>
    //         <th>Economy Columns</th>
    //         <th>Business Rows</th>
    //         <th>Business Columns</th>
    //         <th>First Class Rows</th>
    //         <th>First Class Columns</th>
    //         <th>Delete Flight</th>
    //       </table>
    //       <div class="tbl-content">
    //         <table cellpadding="0" cellspacing="0" border="0">
    //           {tableBody}
    //         </table>
    //       </div>
    //     </div>
    //   </section>
    // );
    if (!this.state.loading && this.state.minimumTime) {
    if (this.state.models.length != 0) {
      return (
        <div style={{ width: "80%", margin: "auto", marginTop: "10px" }}>
          <div className="reservationTitleDiv">
            <div class="reservationTitleText">All Flight Models</div>
            <img class="reservation-bg" src="departure.jpg" style={{
              height : "380px"
            }}/>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                   Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Economy Rows
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Economy Columns &nbsp;
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Business Rows&nbsp;
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Business Columns&nbsp;
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  First Class Rows&nbsp;
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                  First Class Columns&nbsp;
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    &nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{modellist}</TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    {
      return (<div style={{ margin: "auto", width: "80%", marginTop: "10px" }}>
      <div className="reservationTitleDiv">
        <div class="reservationTitleText">Search Flight Result</div>
        <img class="reservation-bg" src="reservation.jpg" />
      </div>
      <div
        style={{
          backgroundColor: "#ffffff",
          verticalAlign: "center",
          paddingTop: "30px",
        }}
      >
                    <label
            style={{
              margin: "2% 37%",
              font: "25px Verdana",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            No Flight Models are found
          </label>
        </div> 
        </div>);
    }
  } else {
    return (
      <div style={{ margin: "auto", width: "80%", marginTop: "10px" }}>
        <div className="reservationTitleDiv">
          <div class="reservationTitleText">All Flight Models</div>
          <img class="reservation-bg" src="departure.jpg" style={{
              height : "380px"
            }} />
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            verticalAlign: "center",
            paddingTop: "30px",
          }}
        >
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              minHeight: "100px",
            }}
          >
            <Skeleton className="skeleton" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </div>
      </div>
    );
          }
  }
}

export default AllFlights;
