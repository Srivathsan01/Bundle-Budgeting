import React, {Component} from 'react';
import axios from 'axios';

export default class NewProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productname : '',
            productprice : '',
            productquantity : ''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ productname: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ productprice: event.target.value});
    }
    onChangeQuantity(event) {
        this.setState({ productquantity: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        let userdata = JSON.parse(window.sessionStorage.getItem("Curuser"))
        let uname = userdata.name

        const newproduct = {
            productname : this.state.productname,
            productprice : this.state.productprice,
            productquantity : this.state.productquantity,
            productowner : uname,
            status : "Available"
        }

        console.log(newproduct)

        axios.post('http://localhost:4000/product/addproduct', newproduct)
             .then(res => console.log(res.data));

        this.setState({
            productname : '',
            productprice : '',
            productquantity : ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>PRODUCT NAME : </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeName}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>PRODUCT QUANTITY </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productquantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div>
                        <label>PRODUCT PRICE :</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productprice}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create New Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}