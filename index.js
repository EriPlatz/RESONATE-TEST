import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      contacts: [],
      country: [],
      selectedUser: {}
    }
  }


  //component is in the DOM

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.map(user => (
        {
          name: `${user.name}`,
          username: `${user.username}`,
          email: `${user.email}`
        }
      )))
      .then(contacts => this.setState({
        contacts,
        isLoading: false
      }))
      .catch(error => console.log('error is: ', error))
  }



  onChangeHandler = e => {
    // get selected user
    const selectedName = e.target.value;
    // search it in existing contacts 
    const selectedUser = this.state.contacts.find(user => user.name === selectedName)
    // if user exist > select user
    if (!!selectedUser) {
      this.setState({
        selectedUser
      });
    }
  };


  render() {
    const { contacts, selectedUser, isLoading } = this.state;

    return (
      <div>
        {
          // if all users are loaded
          !isLoading && <div className="container">
            <div className="row">
              <div className="filter-container col-6 mt-5">
                <select name="" id="" onChange={this.onChangeHandler}>
                  {
                    this.state.contacts.map(contact => {
                      const { email, name } = contact;
                      return <option key={email} value={name}>{name}</option>
                    })
                  }
                </select>
              </div>
              <div className="filter-results col-6">
                <p>
                  {/*Rendered data*/}
                  {Object.keys(selectedUser).length > 0 &&
                    <pre>
                      <h3>Select your users:</h3>
                      <span >UserName: {selectedUser.username}</span><br />
                      <span >Name: {selectedUser.name}</span><br />
                      <span >Email: {selectedUser.email}</span>
                    </pre>
                  }
                </p>
              </div>
            </div>
          </div>
        }
      </div>

    )


  }
}

render(<App />, document.getElementById('users'));
