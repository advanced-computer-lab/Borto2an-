import React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Container,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";

import MyButton from "../Button"

const theme = createTheme();

class CreateModel extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      economyRows: 0,
      economyColumns: 0,
      businessRows: 0,
      businessColumns: 0,
      firstClassRows: 0,
      firstClassColumns: 0,
      message: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      economyRows: this.state.economyRows,
      economyColumns: this.state.economyColumns,
      businessRows: this.state.businessRows,
      businessColumns: this.state.businessColumns,
      firstClassRows: this.state.firstClassRows,
      firstClassColumns: this.state.firstClassColumns,
    };
    axios
      .post("http://localhost:8000/api/airplaneModel", data, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.setState({
          name: "",
          economyRows: 0,
          economyColumns: 0,
          businessRows: 0,
          businessColumns: 0,
          firstClassRows: 0,
          firstClassColumns: 0,
        });
        this.setState({ message: "Flight Model created successfully!!" });
        setTimeout(() => {
          this.props.history.push("/all_models");
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
        <div
          className="list "
          style={{
            paddingBottom: "100px",
            width: "50%",
            marginTop: "50px",
          }}
        >
          <div
            className="settings"
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="TripTitleDiv"
              style={{
                height: "130px",
                marginBottom: "20px",
                paddingBottom: "50px",
              }}
            >
              <div class="TripTitleText">Create Flight Model</div>
              <img
                class="Trip-bg"
                src="admin.jpg"
                style={{
                  left: "400px",
                  opacity: "0.7",
                  top: -120,
                }}
              />
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
              marginBottom: -10,
              marginTop: -5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                    sx={{ mt: 5 }}
                    noValidate
                    onSubmit={this.onSubmit}
                  >
                    {/* Model Name:
                <div>
                  <input
                    type='text'
                    placeholder='Airbus 1192'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Model Name"
                        name="name"
                        onChange={this.onChange}
                        fullWidth
                      />
                    </Grid>
                    <br />
                    {/* Economy Rows:
                <div>
                  <input
                    type='number'
                    name='economyRows'
                    value={this.state.economyRows}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="economyRows"
                        onChange={this.onChange}
                        label="No. economy rows"
                        
                        fullWidth
                       
                      />
                    </Grid>
                    <br />
                    {/* Economy Columns:
                <div>
                  <input
                    type='number'
                    name='economyColumns'
                    value={this.state.economyColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="economyColumns"
                        onChange={this.onChange}
                        label="No. economy columns"
                        fullWidth
                      />
                    </Grid>
                    <br />
                    {/* Business Rows:
                <div>
                  <input
                    type='number'
                    name='businessRows'
                    value={this.state.businessRows}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="businessRows"
                        onChange={this.onChange}
                        label="No. business rows"
                        fullWidth
                      />
                    </Grid>
                    <br />
                    {/* Business Columns:
                <div>
                  <input
                    type='number'
                    name='businessColumns'
                    value={this.state.businessColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="businessColumns"
                        onChange={this.onChange}
                        label="No. business columns"
                        fullWidth
                      />
                    </Grid>
                    <br />
                    {/* First Class Rows:
                <div>
                  <input
                    type='number'
                    name='firstClassRows'
                    value={this.state.firstClassRows}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="firstClassRows"
                        onChange={this.onChange}
                        label="No. first class rows"
                        fullWidth
                      />
                    </Grid>
                    <br />
                    {/* First Class Columns:
                <div>
                  <input
                    type='number'
                    name='firstClassColumns'
                    value={this.state.firstClassColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        name="firstClassColumns"
                        onChange={this.onChange}
                        label="No. first class columns"
                        fullWidth
                      />
                    </Grid>
                    <br />

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
              label = "Create Model"
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
      </>
    );
  }
}

export default CreateModel;