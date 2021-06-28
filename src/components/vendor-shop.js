import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class VendorShop extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            vendorproducts :[]
        }

    }
    componentDidMount() {
        axios.get('http://localhost:4000/product/getproducts')
             .then(response => {
                let uname = JSON.parse(window.sessionStorage.getItem("Curuser")).name
                let curprods = []

                for (var i in response.data)
                    {  
                        if(response.data[i].productowner === uname)
                        curprods.push(response.data[i])
                    }
                 this.setState({vendorproducts: curprods});
             })
             .catch(function(error) {
                 console.log(error);
             })
        }
    

    render() {
        return (
            <div>
            <div className="form-group">
                <h1>Hello {JSON.parse(window.sessionStorage.getItem("Curuser")).name}!</h1>
                <button  style={{float:"right"}} onClick={(e) => window.location.reload()} className="btn btn-primary">Homepage</button>
            </div>
            <br></br>            
            <br></br>            

            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "orange"}}>Product Name</th>
                            <th style={{backgroundColor: "tomato"}}>Product Quantity</th>
                            <th style={{backgroundColor: "chartreuse"}}>Product Price</th>
                            <th style={{backgroundColor: "cyan"}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.vendorproducts.map((currentproduct, i) => {
                            return (
                                <tr>
                                    <td>{currentproduct.productname}</td>
                                    <td>{currentproduct.productprice}</td>
                                    <td>{currentproduct.productquantity}</td>
                                    <td>{currentproduct.status}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            <div className="createprodpage">
                <Link to="/createproduct" style={{color: "red"}}><b>Create a New Product</b></Link>
            </div>
            </div>
        )
    }
}