
import { useContext } from 'react';
import RootContext from '../contexts/Root';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { username } = useContext(RootContext);
  // console.log('Username :' , username);
  return (
    <div>
      <ul>
        <li> <NavLink to="/">Home</NavLink> </li>
        {username
          ?
          <>
            <li> <NavLink to="/snippets">My Snippets</NavLink> </li>
            <li> <NavLink to="/logout">Logout</NavLink> </li>
          </>
          :
          <>
            <li> <NavLink to="/login">Login</NavLink> </li>
            <li> <NavLink to="/signup">Signup</NavLink> </li>
          </>
        }
      </ul>
    </div>
  )
}

export default Navbar;