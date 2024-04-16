import { Component } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Container, IconButton } from '@mui/material';
import { Navigate } from "react-router-dom";

export default class Signup extends Component {

  state = {
    username: "example",
    email: "example@email.com",
    first_name: "Jhon",
    last_name: "Doe",
    password: "123Code",
    show: false,
    error: false,
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  toggleIcon = () => {
    this.setState(prevState => ({
      ...prevState,
      show: !prevState.show,
    }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      ...prevState,
      error: false,
    }));


    const url = import.meta.env.VITE_API + "users/register/";

    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    });
    if (response.ok) {
      
      this.setState(prevState => ({
        ...prevState,
        error: true,
      }));

    } else {
      alert("Try Again Laudo.");
    }
  }

  render() {

    const { username, email, first_name, last_name, password, show,error } = this.state;

    return (
      <Container>
        {error && (
          <Navigate to="/login" replace={true} />
        )}
        <div>
          <form onSubmit={this.handleSubmit}>

            <div>
              <label htmlFor="username">Enter Username:</label>
              <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="email">Enter Email:</label>
              <input type="email" name="email" id="email" value={email} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="first_name">Enter First Name:</label>
              <input type="text" name="first_name" id="first_name" value={first_name} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="last_name">Enter Last Name:</label>
              <input type="text" name="last_name" id="last_name" value={last_name} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="password">Enter Password:</label>
              <input type={show ? "text" : "password"} name="password" id="password" value={password} onChange={this.handleChange} />

              <IconButton onClick={this.toggleIcon}>
                {show ?
                  <VisibilityOffIcon /> :
                  <VisibilityIcon />
                }
              </IconButton>
            </div>

            <div>
              <button type="submit">Signup</button>
              <p>Already a member <a href="/login">Login</a></p>
            </div>

          </form>
        </div>
      </Container>
    )
  }
}
