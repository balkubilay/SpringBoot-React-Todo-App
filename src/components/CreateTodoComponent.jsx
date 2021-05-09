import React, { Component } from 'react';
import TodoService from '../services/TodoService';

class CreateTodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
           title: '',
           description: '',
           time: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveTodo = this.saveTodo.bind(this);

    }
    saveTodo = (e) => {
        e.preventDefault();

        let todo = {title: this.state.title, description: this.state.description, time: this.state.time};
        console.log('todo =>' + JSON.stringify(todo));

        TodoService.createTodo(todo).then(res => {
            this.props.history.push('/todos')
        });

    }

    changeTitleHandler= (event) =>{
        this.setState({title: event.target.value});
    }
    changeDescriptionHandler= (event) =>{
        this.setState({description: event.target.value});
    }
    changeTimeHandler= (event) =>{
        this.setState({time: event.target.value});
    }
     
    cancel(){
        this.props.history.push('/todos');

    }
    render() {
        return (
            <div style={{paddingTop:"100px"}}>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3">
                            <h3 className = "text-center">Add Todo</h3>
                            <div className = "card-body">
                                <form>
                                    <div className ="form-group">
                                        <label>Title</label>
                                        <input placeholder="Title" name="title" className="form-control" value={this.state.title} onChange={this.changeTitleHandler}/>

                                    </div>
                                    <div className ="form-group">
                                        <label>Description</label>
                                        <input placeholder="Description" name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}/>

                                    </div>
                                    <div className ="form-group">
                                        <label>Time</label>
                                        <input placeholder="Time" name="time" className="form-control" value={this.state.time} onChange={this.changeTimeHandler}/>

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveTodo}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTodoComponent;