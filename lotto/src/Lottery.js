import React, {Component} from 'react';
import Ball from './Ball';
import './Lottery.css'

class Lottery extends Component {
    static defaultProps = {
        maxNum : 40,
        maxBalls : 6,
        title : "Lotto"
    }
    constructor(props) {
        super(props);
        this.state = {nums : Array.from({length : this.props.maxBalls})}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.generateNum();
    }
    generateNum() {
        this.setState(
            curState => (
                {
                    nums : curState.nums.map(n =>  Math.floor(Math.random() * this.props.maxNum) + 1)
                }
            )
        )
    }
    render() {
        return(
            <div className = 'Lottery'>
                <h1>{this.props.title}</h1>
                <div> 
                {this.state.nums.map(
                    elem => <Ball num = {elem}/>
                )}
                </div>
                <button onClick={this.handleClick}>Generate</button>
            </div>
        );
    }
}
export default Lottery;