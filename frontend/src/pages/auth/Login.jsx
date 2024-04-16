import { useState, useContext } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { jwtDecode } from "jwt-decode";

import { useNavigate } from 'react-router-dom';
import RootContext from '../../contexts/Root';

import { Container, IconButton } from '@mui/material';

export default function Login() {
  const [data, setData] = useState({
    email: "example@email.com",
    password: "123Code",
    show: false,
  });
  const handleChange = event => {
    const { value, name } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const toggleIcon = () => {
    setData(prevState => ({
      ...prevState,
      show: !prevState.show,
    }));
  }

  const navigate = useNavigate();
  const { setUsername, setId } = useContext(RootContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const url = import.meta.env.VITE_API + "users/login/";

    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('access', data.access_key );
      const userInfo = jwtDecode(data.access_key);
      setUsername(userInfo.username);
      setId(userInfo.id);
      navigate('/');
    } else {
      alert("Ki Password Mone kor");
    }
  }
  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="email">Enter Email:</label>
            <input type="email" name="email" id="email" value={data.email} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="password">Enter Password:</label>
            <input type={data.show ? "text" : "password"} name="password" id="password" value={data.password} onChange={handleChange} />

            <IconButton onClick={toggleIcon}>
              {data.show ?
                <VisibilityOffIcon /> :
                <VisibilityIcon />
              }
            </IconButton>
          </div>

          <div>
            <button type="submit">Login</button>
            <p>Became a member <a href="/signup">Register</a></p>
          </div>

        </form>
      </div>
    </Container>
  )
}
