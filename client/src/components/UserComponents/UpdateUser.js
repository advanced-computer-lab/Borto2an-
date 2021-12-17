import axios from "axios";
import React from "react";

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated:  JSON.parse(localStorage.getItem('user')),
      _id: -1
    };
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
    const update = this.state.updated;
    if('password' in update && update['password']==='')
    delete update.password;
    delete update.isAdmin;
    delete update._id;
    const data = {
      _id: this.state._id,
      update: update
    };
    console.log(data);
    axios
      .put("http://localhost:8000/api/user", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {localStorage.setItem('user',JSON.stringify(res.data));window.dispatchEvent( new Event('storage') );this.props.histor.push('/user');
      alert("updated successfully")})
      .catch(err => alert("Update failed! Data Error!!"));
  };

  render() {
    return (
      <>
      <br></br> 
      <div class="profile-container" >
      <form className="ProfileForm-container" action="#" noValidate onSubmit={this.onSubmit}>
        <h2>Update Personal Information </h2>
        <br></br>
        
        First Name:
              <input  className="profile-input" type="text"   name = "firstName" value = {this.state.updated.firstName} onChange={this.onChange} />
        Last Name:
              <input  className="profile-input" type="text"   value = {this.state.updated.lastName} name = "lastName" onChange={this.onChange} />
        {this.state.updated.isAdmin?<></>:
        <>
        Passport Number:
              <input  className="profile-input" type="text"  value = {this.state.updated.passportNumber} name = "passportNumber" onChange={this.onChange}  />
        </>
        }
        Email:
              <input  className="profile-input" type="email"  value = {this.state.updated.email}  name = "email" onChange={this.onChange}/>
        Password:
              <input  className="profile-input" type="password"  placeholder="Enter New Password" name = "password" onChange={this.onChange} />
  
        <button>Update Info</button>
        </form>
        </div>
        <br></br>
        </>
    );
  }
}

export default UpdateUser;
