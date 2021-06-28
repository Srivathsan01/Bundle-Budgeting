import React, { Component } from 'react';
import axios from 'axios';
import Button from './button'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class CustomerShop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchprod :"",
            allproducts :[]
        }
        this.onChangesearch = this.onChangesearch.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.SortPrice = this.SortPrice.bind(this)
        this.SortQuant = this.SortQuant.bind(this)
    }

    componentDidMount() {
        let allprods = []
        axios.get('http://localhost:4000/product/getproducts')
        .then(response => {
            for (var i in response.data) {
                allprods.push(response.data[i])
            }
            this.setState({ allproducts: allprods });
        })
        .catch(function (error) {
            console.log(error);
        })
    }
        onChangesearch(event)
        {
            this.setState({searchprod:event.target.value});
        }
        onSearch(e)
        {
            e.preventDefault();
            let prodname = this.state.searchprod
            axios.post('http://localhost:4000/product/search',{productname: prodname})
            .then(response => {
                // console.log(response)
                this.setState({allproducts : response.data})
            })
        }
        SortPrice(e)
        {
            e.preventDefault();
            console.log("About to sort")
            this.setState({allproducts : []})
            let allprods = this.state.allproducts;
            // this.setState({ allproducts: allprods });
            allprods.sort(function(a, b){
                return a.productprice-b.productprice
            })
            this.setState({allproducts : allprods});
            console.log(allprods)
            
        }
        SortQuant(e)
        {
            e.preventDefault();
            this.setState({allproducts : []})
            let allprods = this.state.allproducts;
            // this.setState({ allproducts: allprods });
            allprods.sort(function(a, b){
                return a.productquantity-b.productquantity
            })
            this.setState({allproducts : allprods});
            
        }
        

render() {
    return (
        <div>
            <div className="form-group">
                <h1>Hello {JSON.parse(window.sessionStorage.getItem("Curuser")).name}!</h1>
                <button style={{float:"right"}} onClick={(e) => window.location.reload()} className="btn btn-primary">Homepage</button>
            </div>
<br></br>            
<br></br>            
            <div>
            <form onSubmit={this.onSearch}>
            <label>SEARCH </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.searchprod}
                               onChange={this.onChangesearch}
                               />
                <br></br>
                <center><div className="form-group">
                    <input type="submit" value="Search" className="btn btn-primary"/>
                </div></center>
            </form>
            </div>
            <div>
                <table className= "table table-hover" border="3">
                    <thead>
                        <tr>
                            <th style={{backgroundColor: "rgb(102, 245, 66)"}}>Product Name</th>
                            <th style={{backgroundColor: "rgb(46, 209, 147)"}}>Product Owner</th>
                            <th style={{backgroundColor: "rgb(52, 105, 237)"}}>Product Quantity</th>
                            <th style={{backgroundColor: "rgb(232, 63, 7)"}}>Product Price</th>
                            <th style={{backgroundColor: "cyan"}}>ORDER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allproducts.map((currentproduct, i) => {
                                return (
                                    <tr>
                                        <td>{currentproduct.productname}</td>
                                        <td>{currentproduct.productowner}</td>
                                        <td>{currentproduct.productquantity}</td>
                                        <td>{currentproduct.productprice}</td>
                                        <td><Button></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <br></br>
            
            <form onSubmit = {this.SortPrice} id='price'>
            <div>
                <input type="submit" value="Sort by Price" className="btn btn-primary"/>
            </div>
            </form>
            <form onSubmit = {this.SortQuant} id='quant'>
            <div align="right">
                <input type="submit" value="Sort by Quantity" className="btn btn-primary"/>
            </div>
            </form>
            <form onSubmit = {this.Placeorder}>
            <div className="form-group"  align="right">
                        <input type="submit"  style={{backgroundColor: "red"}} value="PLACE ORDER" className="btn btn-primary"/>
                    </div>
            </form>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}
}
