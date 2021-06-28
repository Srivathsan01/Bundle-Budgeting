import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password:'',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userlogindata = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post('http://localhost:4000/authenticate',userlogindata)
            .then(response => {
                console.log(response)
                this.setState({users: response.data});
                let CurrentUserType = response.data[0].usertype
                let curlogindata = {
                    id: response.data[0]._id,
                    name: response.data[0].username,
                    usertype: response.data[0].usertype
                }

                console.log(curlogindata)
                
                window.sessionStorage.setItem("Curuser" , JSON.stringify(curlogindata))

                if(CurrentUserType === "CUSTOMER") {
                    window.location = "/customershop"

                    // console.log(window.sessionStorage.getItem("Curuser"))
                }
                else if(CurrentUserType === "VENDOR"){
                    window.location = "/vendorshop"
                    // console.log(window.sessionStorage.getItem("Curuser"))
                }
            })
            .catch(function(error) {
                alert("Wrong Username or Password")
                window.location = "/login"
            })

        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}