import React, { Component } from "react";
import axios from "axios";

 class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn:false,
            email:"",
            password:""
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    console.log(this.state); 
    axios
      .post('http://localhost:8000/api/user/login',data)
      .then(res => {
          if(!res.data.message){
        this.setState({loggedIn:true,email:"",password:""
        });
        this.props.history.push("/");
        alert("Logged in successfully!!");
      }
      else{        
          alert(res.data.message);
    }
    })
      .catch(err => {
          console.log(err);
      });      
  };



    render() {
        return (
            <div className="outer">
            <div className="inner">
            <form noValidate onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name ="email" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name = "password" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <br/>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}
export default Login;