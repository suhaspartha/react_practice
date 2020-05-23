import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.state = {isEditing : false,
            task : this.props.todo
        }
    }
    deleteHandler(){
        this.props.delete(this.props.id);
    }
    handleClick(){
        this.setState({isEditing : !this.state.isEditing});
    }
    handleChange(evt){
        evt.preventDefault();
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }
    handleUpdate(evt){
        evt.preventDefault();
        this.props.update(this.props.id, this.state.task);
        this.setState({isEditing : !this.state.isEditing});
    }
    handleComplete(evt){
        evt.preventDefault();
        //this.setState({...this.state, completed: !this.props.completed});
        this.props.strike(this.props.id);
        //this.setState({...this.state, completed: !this.props.completed});
    }
    render(){
        let result;
        if(this.state.isEditing){
           result = (
            <div>
                <form>
                    <input type = 'text' name = 'task' value = {this.state.task} 
                    onChange = {this.handleChange}/>
                    <button onClick={this.handleUpdate}>Update</button>
                </form>
            </div>
           );
        }else{
            result = (
                <div className = "TodoItem">
                    <li className = {this.props.completed?"complete": ""} 
                    onClick = {this.handleComplete}>{this.props.todo}</li>
                    <button onClick = {this.handleClick}>Edit</button>
                    <button onClick = {this.deleteHandler}>Delete</button>
                </div>
            );
        }
        return result;
    }
}
export default TodoItem;