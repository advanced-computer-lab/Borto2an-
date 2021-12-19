import axios from "axios";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false ,
      error : '' ,
      updated:  JSON.parse(localStorage.getItem('user')),
      _id: -1
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.showMessage) console.log("show message");
    if (this.state.showMessage && !prevProps.showMessage) {
      setTimeout(() => {
        this.setState({ showMessage: false });
        console.log("stop Showing message");
      }, 3000);
    }
  }
  componentDidMount() {
    const userData = localStorage.getItem('user');
    this.setState({
      _id: JSON.parse(userData)._id
    });
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.updated.oldPassword || !this.state.updated.newPassword || !this.state.updated.newPasswordConfirm){
      this.setState({ showMessage: true ,
        error :"Please Fill all of the fields"});
        return;
    }
    // if(this.state.updated.oldPassword !== this.state.updated.password){
    //   this.setState({ showMessage: true ,
    //     error :"Wrong Password!"});
    //     return;
    // }
    if(this.state.updated.newPassword !== this.state.updated.newPasswordConfirm){
      this.setState({ showMessage: true ,
        error :"Confirmation Password must match the New Password"});
        return;
    }
    const savedPassword = this.state.updated.newPassword;
    // if('password' in update && update['password']==='')
    const data = {
      _id: this.state._id,
      update : {
         password : savedPassword,
         oldPassword : this.state.updated.oldPassword
      }
    };
    //console.log(data);
    axios
      .put("http://localhost:8000/api/user/password", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {this.setState({ showMessage: true ,
        error :"updated successfully"})
        localStorage.setItem('user',JSON.stringify(res.data));this.props.history.push('/user');
      window.dispatchEvent( new Event('storage') );
      ;
   //   alert("updated successfully")
  })
      .catch(err => {
          if(err.response){
          if(err.response.status === 401){
            this.setState({ showMessage: true ,
              error :"Wrong Password!"});
       //   alert("Wrong Password!")
          }
          else{
            this.setState({ showMessage: true ,
              error :"Update failed! Data Error!!"});
        // alert("Update failed! Data Error!!")
          }
          }
         console.log(err);
      });
  };

  render() {
    // const handleClickOpen = () => {
    //     this.setState({ open: true });
    //   };
    //   const handleClose = () => {
    //     this.setState({ open: false });
    //   };
    return (
      <>
      <br></br> 
      <div class="profile-container" >
      <form className="ProfileForm-container" action="#" noValidate onSubmit={this.onSubmit}>
        <h2 style={{
            marginTop:"50px"
        }}>Change Your Password </h2>    
        <br></br>
        {this.state.showMessage ? this.state.error === 'updated successfully' ? (
                <label id="signSuccessMessage">{this.state.error}</label>
              ) : <label id="signErrorMessage">{this.state.error}</label> : (
                <br/>
              )}
        Old Password 
              <input  className="profile-input" style={{marginBottom:"20px" , width:"80%"}} type="password"   name = "oldPassword"  onChange={this.onChange} />   
        New Password 
              <input  className="profile-input" style={{marginBottom:"20px" , width:"80%"}} type="password"   name = "newPassword" onChange={this.onChange} />

        Confirm New Password
              <input  className="profile-input" style={{marginBottom:"20px" , width:"80%"}} type="password"   name = "newPasswordConfirm" onChange={this.onChange}  />
        <button>Update Password</button>
        </form>
        </div>
        <br></br>
        {/* <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
           {!this.state.updated.oldPassword  || !this.state.updated.newPassword  ||
           this.state.updated.newPasswordConfirm  ? "Please fill in all the fields" : this.state.updated.oldPassword !== this.state.updated.password ?
              "Old password is not correct" : this.state.updated.newPassword !== this.state.updated.newPasswordConfirm ?
              "Confirmation Password must match the New Password" : "Password Changed successfully!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={(!this.state.updated.oldPassword || !this.state.updated.newPassword ||
           !this.state.updated.newPasswordConfirm  || this.state.updated.oldPassword !== this.state.updated.password 
              || this.state.updated.newPassword !== this.state.updated.newPasswordConfirm) ?
              this.onSubmit : handleClose}>Ok</button>
          </DialogActions>
        </Dialog> */}
        </>
    );
  }
}

export default ChangePassword;