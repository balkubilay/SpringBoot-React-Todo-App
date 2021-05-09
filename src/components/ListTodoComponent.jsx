import React, { Component } from 'react';
import TodoService from '../services/TodoService';

class ListTodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [

            ]
        }
        this.addTodo = this.addTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    deleteTodo(id){
        TodoService.deleteTodo(id).then(res => {
            this.setState({todos: this.state.todos.filter(todo => todo.id !== id)});
        });
    }

    editTodo(id){
        this.props.history.push(`/update-todo/${id}`);
    }

    componentDidMount(){
            TodoService.getTodos().then((res) => {
                this.setState({ todos: res.data});
            });
    }


    addTodo(){
        this.props.history.push('/add-todo');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Todo List</h2>
                <div className="d-grid gap-2 d-md-block">
                    <button className="btn btn-primary" onClick={this.addTodo}>Add Todo</button>
                </div>
                <div className="row"></div>
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr key = {todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.time}</td>
                                        <td>
                                            <button onClick = {() => this.editTodo(todo.id)} className="btn btn-info" >Update</button>
                                            <button style={{marginLeft:"15px"}} onClick = {() => this.deleteTodo(todo.id)} className="btn btn-danger" >Delete</button>

                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>
                        
                    </table>
            </div>
        );
    }
}

export default ListTodoComponent;