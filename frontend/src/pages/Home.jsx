import { Component } from 'react'
import Textarea from '../comps/Textarea';

export default class Home extends Component {

  state = {
    code: "print('Hello,World!')",
    lang: 'python',
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);

    
    const url = import.meta.env.VITE_API + "snippets/";

    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    });
    if (response.ok) {
      
      const data = await response.json();
      console.log(data);
      alert('Data Saved');
      
    } else {
      alert('Login First');
    }
    
  }
  
  render() {    
    return < Textarea
      state={this.state}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
    />
  }
}