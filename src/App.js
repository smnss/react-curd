import React, { Component } from "react";
import axios from 'axios';
import logo from "./logo.svg";
import "./App.css";
import ListItem from './todo-item'


class App extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      editingIndex: null,
      newTodo: "dfdfd",
      todos: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNew = this.addNew.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    // this.getId = this.getId.bind(this);
    this.apiEndPoint = 'https://5c262798b1fbf10014892a08.mockapi.io/ToDoApp/';
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="container">
          <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new ToDo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                id="button-addon2"
                onClick={!this.state.editing ? this.addNew : this.updateTodo}
              >
                {!this.state.editing ? 'Add': 'Update'}
              </button>
            </div>
          </div>
         { this.state.loading && <p>Loading....</p>}
         {(!this.state.editing || !this.state.loading) && 
          <ul className="list-group">
            {this.state.todos.map((item, index) => {
              return (
                <ListItem 
                key={item.id}
                editTodo= { () => {
                  this.editTodo(index);
                }}
                item= {item}
                deleteTodo= {() => {
                  this.deleteTodo(index);
                }}
                />
              );
            })}
          </ul>
         }
        </section>
      </div>
    );
  }
 async componentDidMount() {
   const response = await axios.get(`${this.apiEndPoint}/todo`);
   this.setState({
     todos: response.data,
     loading: false
   })
 }
  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  // getId() {
  //   const latestId = this.state.todos[this.state.todos.length-1];
  //   if(latestId) {
  //     return latestId.id + 1;
  //   }
  //   return 1;
  // }
  async addNew() {
    const newTodo = {
      name: this.state.newTodo
    }

    const response = await axios.post(`${this.apiEndPoint}/todo`, newTodo);
    
    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos,
      newTodo: ''
    });
   
  }
  async updateTodo() {
    const editing = false;
    const newTodo = '';
    const editingIndex = null;
    const todos = this.state.todos;
    const updateId = todos[this.state.editingIndex].id;
    const response = await axios.put(`${this.apiEndPoint}/todo/${updateId}`, {name: this.state.newTodo});
    todos[this.state.editingIndex] = response.data;
    this.setState({
      editing,
      todos,
      newTodo,
      editingIndex
    });
  }
  async deleteTodo(index) {
    const todos = this.state.todos;
    const deleteId = todos[index].id;
    await axios.delete(`${this.apiEndPoint}/todo/${deleteId}`);
    delete todos[index];
    this.setState({
      todos
    });

  }
  editTodo(index) {
    const editing = true;
    const newTodo = this.state.todos[index].name;
    const editingIndex = index;
    this.setState({
      editing,
      newTodo,
      editingIndex
    });
  }

}

export default App;
