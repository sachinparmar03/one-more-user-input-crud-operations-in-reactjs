import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [], txt1: '', txt2: '', editing: null }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { txt1, txt2, editing } = this.state;

    if (editing !== null) {
      const updatedTodos = [...this.state.todos];
      updatedTodos[editing] = { fname: txt1,lname: txt2 };

      this.setState({todos: updatedTodos,txt1: '',txt2: '',editing: null});
    } 
    else {
      this.setState({todos: [...this.state.todos, { fname: txt1, lname: txt2 }],txt1: '',txt2: ''});
    }
  };

  handleEdit = (index) => {
    const { fname, lname } = this.state.todos[index];
    this.setState({txt1: fname,txt2: lname,editing: index});
  };

  handleDelete = (index) => {
    const updatedTodos = [...this.state.todos];
    updatedTodos.splice(index, 1);

    this.setState({todos: updatedTodos,txt1: '',txt2: '',editing: null});
  };

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          First Name : <input type="text" name="txt1" value={this.state.txt1} onChange={this.handleChange} /><br /><br />
          Last Name  : <input type="text" name="txt2" value={this.state.txt2} onChange={this.handleChange} /><br /><br />
          <button type="submit">{this.state.editing !== null ? 'Update' : 'Add'}</button>
        </form>
        <table border={1}>
          <tr>
            <th>First Name </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
          {this.state.todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.fname}</td>
              <td>{todo.lname}</td>
              <td>
                <button onClick={() => this.handleEdit(index)}>Edit</button>
                <button onClick={() => this.handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default TodoList;
