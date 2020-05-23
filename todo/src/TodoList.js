import React, {Component} from 'react';
import TodoItem from './TodoItem';
import NewTodoForm from './NewTodoForm';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos : []
        };
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }
    addTodo(task){
        this.setState(
            { todos : [...this.state.todos, task]}
        )
    }
    removeTodo(id){
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }
    handleUpdate(id, updatedTodo){
        let updatedArray = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, task:updatedTodo};
            } return todo;
        }
        );
        this.setState(
            {todos : updatedArray}
        );
    }
    handleComplete(id){
        this.setState({...this.setState.todos, });
        let updatedArray = this.state.todos.map(todo => {
            if(todo.id === id){
                console.log(todo);
                return {...todo, completed: !todo.completed};
            } return todo;
        }
        );
        this.setState(
            {todos : updatedArray}
        );
    }
    render() {
        const items = this.state.todos.map(todo => {
            return <TodoItem key = {todo.id} 
            id= {todo.id}
            todo = {todo.task} 
            delete = {this.removeTodo} 
            update={this.handleUpdate}
            completed = {todo.completed}
            strike = {this.handleComplete}/>
        })
        return(
            <div>
                <ul>
                 {items}
                </ul>
                <NewTodoForm addTask = {this.addTodo}/>
            </div>
        );
    }
}
export default TodoList;