import React, { Component } from 'react';

export default class Button extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
    }
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecreaseItem = this.DecreaseItem.bind(this);
  }

  IncrementItem(){
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem(){
      if(this.state.clicks >0)
        {
            this.setState({ clicks: this.state.clicks - 1 });
        }
  }
  

  render() {
    return (
      <div>
        <button onClick={this.DecreaseItem}>-</button>
        <input type="number" id="number" value={ this.state.clicks} />
        <button onClick={this.IncrementItem}>+</button>
      </div>
    );
  }
}