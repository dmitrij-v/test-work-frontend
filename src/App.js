import React, { Component } from 'react';
import axios from "axios";
import SignUpForm from './components/SignUpForm/SignUpForm';
import TaskTracker from './components/TaskTracker/TaskTracker';

const parseResponse = response => {
  localStorage.setItem('auth-token', JSON.stringify({
    'access-token': response.headers['access-token'],
    client: response.headers['client'],
    uid: response.headers['uid'],
  }));
  const user = {
    id: response.data.id,
    email: response.data.email,
  }
  const tasks = response.data.tasks

  return { user, tasks }
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      tasks: [],
      loggedIn: false,
    }
  }

  componentWillMount(){
    const currentToken = JSON.parse(localStorage.getItem('auth-token'));

    if (currentToken) {
      const url = `${process.env.REACT_APP_HOST_URL}/current-user`;

      axios({
        method: 'get',
        url,
        headers: currentToken
      })
        .then(response => {
          const { user, tasks } = parseResponse(response);

          this.setState({ user, tasks, loggedIn: true});
        })
        .catch(error => console.log(error));
    }
  }

  getUser = ({ email, password }, signUp) => {
    const url = `${process.env.REACT_APP_HOST_URL}/auth${signUp ? '' : '/sign_in'}`

    axios({
      method: 'post',
      url,
      data: { email, password },
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        const { user, tasks } = parseResponse(response);

        this.setState({ user, tasks, loggedIn: true});
      })
      .catch(error => console.log(error));
  };

  logOut = () => {
    const url = `${process.env.REACT_APP_HOST_URL}/auth/sign_out`;
    const currentToken = JSON.parse(localStorage.getItem('auth-token'));

    axios({
      method: 'delete',
      url,
      headers: currentToken
    })
      .then(response => {
        this.setState({ user: {}, tasks: {}, loggedIn: false });
        localStorage.removeItem('auth-token');
      })
      .catch(error => console.log(error));
  }

  addTask = ({ string, substring }) => {
    const url = `${process.env.REACT_APP_HOST_URL}/tasks`;
    const currentToken = JSON.parse(localStorage.getItem('auth-token'));

    axios({
      method: 'post',
      url,
      data: { string, substring },
      headers: currentToken
    })
      .then(response => {
        const { tasks } = this.state;

        tasks.unshift(response.data.result);
        this.setState({ tasks });
      })
      .catch(error => console.log(error));
  }

  deleteTask = id => {
    const url = `${process.env.REACT_APP_HOST_URL}/tasks/${id}`;
    const currentToken = JSON.parse(localStorage.getItem('auth-token'));

    axios({
      method: 'delete',
      url,
      headers: currentToken
    })
      .then(response => {
        const tasks = this.state.tasks.filter(task => task.id !== id);

        this.setState({ tasks });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { user, loggedIn, tasks } = this.state;

    return (
      <div className="main">
        { loggedIn
          ? <TaskTracker
              user={user}
              tasks={tasks}
              addTask={this.addTask}
              deleteTask={this.deleteTask}
              logOut={this.logOut}
            />
          : <SignUpForm getUser={this.getUser}/>
        }
      </div>
    );
  }
}

export default App;
