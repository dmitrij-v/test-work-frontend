import React, { Component } from 'react';
import Parser from 'html-react-parser';
import ButtonLine from '../stateless/ButtonLine/ButtonLine';
import EditLine from '../stateless/EditLine/EditLine';

class TaskTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      string: '',
      substring: ''
    }
  }

  showPositions = (string, list) => {
    // I reversed array for working from end of the string to the start and save char's indexes in the same places
    const current_arr = list.reverse();

    for (let i = 0; i < current_arr.length; i++) {
      string = `${string.slice(0, current_arr[i])}<u>${string.charAt(current_arr[i])}</u>${string.slice(current_arr[i]+1)}`;
    }

    return string
  }

  editString = event => this.setState({ string: event.target.value });
  editSubstring = event => this.setState({ substring: event.target.value});
  sendTask = () => {
    const { string, substring } = this.state;
    if (string.length !== 0 && substring.length !== 0) {
      this.props.addTask(this.state);
      this.resetTask();
    }
  }
  resetTask = () => this.setState({ string: '', substring: ''});

  headerLine = () => {
    return(
      <div className="task-tracker--list-header">
        <div className="task-tracker--item">Base string</div>
        <div className="task-tracker--item">Finding string</div>
        <div className="task-tracker--item">Found</div>
        <div className="task-tracker--item">Positions</div>
      </div>
    )
  }

  taskLine = (task) => {
    return(
      <div className="task-tracker--list-line" key={task.id}>
        <div className="task-tracker--item string">{task.base_string}</div>
        <div className="task-tracker--item substring">{task.substring}</div>
        <div className="task-tracker--item status">{task.status ? "Found" : "Not found"}</div>
        <div className="task-tracker--item result">{task.status && Parser(this.showPositions(task.base_string, task.enterings))}</div>
        { ButtonLine("task-tracker--line-item", "Delete", 'task-tracker--delete-button', this.props.deleteTask.bind(this, task.id)) }
      </div>
    )
  }

  render() {
    const { user, logOut, tasks } = this.props;
    const list = tasks.map(task => this.taskLine(task))

    return(
      <div className="task-tracker">
        <div className="task-tracker--header">
          <p>Hello {user.email}</p>
          <button className="task-tracker--log-out" type='button' onClick={logOut}>Log out</button>
        </div>
        <div className="task-tracker--add-panel">
          { EditLine("task-tracker--form-line", 'Please enter string', 'text', this.editString, this.state.string, 'task-tracker--string-input') }
          { EditLine("task-tracker--form-line", 'Please enter string for finding', 'text', this.editSubstring, this.state.substring, 'task-tracker--substring-input') }
          { ButtonLine("task-tracker--form-line", 'Send task', 'task-tracker--send-button', this.sendTask) }
          { ButtonLine("task-tracker--form-line", 'Cancel', 'task-tracker--cancel-button', this.resetTask) }
        </div>
        <div className="task-tracker--list">
          {this.headerLine()}
          {list}
        </div>
      </div>
    )
  }
};

export default TaskTracker;