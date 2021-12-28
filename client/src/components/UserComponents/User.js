import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import Stack from "@mui/material/Stack";
import Button from "../Button" ;
import MUIButton from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// const theme = createTheme();

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
      <img for="photo-upload" src={src} style={{width:"auto",height:"150px" ,borderRadius: "50%"}}/>
    <input id="photo-upload" type="file" onChange={onChange}/>  
  </label>
const Profile =({
  onSubmit,
  src,
})=>
    <form onSubmit={onSubmit} style={{marginBottom:"15px"}}>
          <img for="photo-upload" src={src} style={{width:"auto",height:"150px" ,borderRadius: "50%" , borderColor:"rgb(0,0,0)"}}/>
          <input  type="image" src="edit.png" border="Specify Image Border" style={{height:"60px",width:"65px" , position:"relative", top:-150,
        right: -100 ,  background: "transparent",
        border: "none"}} onClick={onSubmit}></input>
    </form>
     
       
const Edit =({
  onSubmit,
  children,
})=>
    <form onSubmit={onSubmit} style={{marginBottom:"15px"}}>
        {children}
      <MUIButton type="submit" variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}>Change your profile picture </MUIButton>
    </form>

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          file: '',
      imagePreviewUrl: localStorage.getItem("profilepicUrl"),
      name:'',
      status:'',
      active: 'edit',
      user: {}
        }
    }

    componentDidMount() {
        this.setState({user:JSON.parse(localStorage.getItem('user'))});
    };

    logout = ()=>{
        
        axios
        .delete("http://localhost:8000/api/user/auth/logout", {
            headers:{"authorization":"Bearer "+localStorage.getItem("token")},
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        .then(() =>{
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('flightSelectionData');
            localStorage.removeItem('reservationSummary');
            localStorage.removeItem('selectedSeats');
            localStorage.removeItem('searchResultData');
            localStorage.removeItem('path');
            window.dispatchEvent( new Event('storage') );
            this.props.history.push('/');
        })
        .catch(err => console.log(err));    
    };

    showReservations = () =>{
        this.props.history.push('/reservations');
    }

    updateData = () => {
        this.props.history.push({pathname:'/update_user',state:this.state.user});
    }
    changePassword = () => {
        this.props.history.push({pathname:'/change_password',state:this.state.user});
    }

    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
        localStorage.setItem("profilepicUrl",reader.result);
      }
      reader.readAsDataURL(file);
    }

    handleSubmit= e =>{
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
  render() {
    const {imagePreviewUrl, 
      name, 
      status, 
      active} = this.state;

      if(!localStorage.getItem("user")){
          return this.props.history.push("/");
      }
    if(this.state.user)
    return (
<>
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
            marginBottom: "-20px",
            paddingBottom: "50px",
          }}
        >
            <div class="TripTitleText">Personal Information</div>
          <img class="Trip-bg" src="personal.jpg" style = {{
            left : "420px",
            opacity : "0.7"
          }} />
                </div>
         
        </div>   
        <Box
                        component="span"
                        border={2}
                        borderRadius={4}
                        borderLeft={1}
                        borderRight={1}
                        borderColor="#a9a9a9"
          sx={{
            marginBottom:-10,
            marginTop: -2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        >
          <Stack direction="row">
                    <input  type="image" src="update.png" border="Specify Image Border" style={{height:"60px",width:"65px" , position:"relative", marginTop:10,
                    marginLeft : "600px",
         background: "transparent",
        border: "none"}} onClick={this.updateData}></input>
        <Stack style={{
          marginTop : "20px"
        }}>
                <Button
                 index={1}
                 label = "Logout"
                 width= "70px"
                 height="40px"
              onClick = {this.logout}
            >
            </Button>
            </Stack>
            </Stack>
          {(active != 'edit')?(
            <Edit onSubmit={this.handleSubmit}>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
            </Edit>
          ):(
            <Profile 
              onSubmit={this.handleSubmit} 
              src={imagePreviewUrl} 
              name={name} 
              status={status}/>)}

      <Container component="main" maxWidth="xs">

          <Box component="form" sx={{}}>
       

   
            <Grid container spacing={2}>
              <Grid item xs={10} sm={6}>
                <TextField
                type="text"  value={this.state.user.firstName} name = "firstName" onChange={this.onChange}
                  fullWidth
                  label="First Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"  value={this.state.user.lastName} name = "firstName" onChange={this.onChange}
                  fullWidth
                  label="Last Name"
                  InputProps={{
                    readOnly: true,
                  }}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"  value={this.state.user.email}  name = "email" onChange={this.onChange}
                  fullWidth
                  label="Email"
                  InputProps={{
                    readOnly: true,
                  }}
                  
                />
              </Grid>

            {this.state.user.isAdmin?<></>:
             <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.passportNumber}  name = "passportNumber" onChange={this.onChange}
               fullWidth
               label="passportNumber"
               InputProps={{
                readOnly: true,
              }}
             />
           </Grid>
            
            }

            <Grid item xs={12}>
             <TextField
               type="text"  value={this.state.user.homeAddress}  name = "homeAddress" onChange={this.onChange}
               fullWidth
               label="Home Address"
               InputProps={{
                readOnly: true,
              }}
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.telephoneNumber} name = "telephoneNumber" onChange={this.onChange} 
               fullWidth
               label="Mobile Number"
               InputProps={{
                readOnly: true,
              }}
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.countryCode} name = "countryCode" onChange={this.onChange}
               fullWidth
               label="Country Code"
               InputProps={{
                readOnly: true,
              }}
             />
           </Grid>

            </Grid>

            <Stack spacing={2} style={{
             marginBottom : "10px",
             marginTop : "20px",
             justifyContent: "center",
             alignItems : "center"
            }}>
            <Button  
              index={1}
              label="Change Password"
              width="250px"
              hight="100px"
              onClick = {this.changePassword}
            >
            </Button>



            {this.state.user.isAdmin?<></>:
          
          <Button
          index={1}
          label="Show my reservations"
          width="250px"
          hight="100px"
          onClick = {this.showReservations}
        >
        </Button>          
          }
          </Stack>
          </Box>
      </Container>
    </Box>
  </div>
    </>
  );
    
  }
}

export default User;