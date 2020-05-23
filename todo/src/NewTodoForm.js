import React, {Component} from "react";
import uuid from "uuid/dist/v4";

class NewTodoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    changeHandler(event){
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }
    submitHandler(event){
        event.preventDefault();
        this.props.addTask({...this.state, id: uuid(), completed: false});
        this.setState({task: ""})
    }
    render(){
        return(
            <div className = 'NewTodoForm'>
                <label htmlFor = 'task'>New Todo</label>
                <form onSubmit = {this.submitHandler}>
                    <input type = 'text'
                    placeholder = 'Enter Todo'
                    id = 'task'
                    name = 'task'
                    onChange = {this.changeHandler}
                    value = {this.state.task}
                    />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}
export default NewTodoForm;