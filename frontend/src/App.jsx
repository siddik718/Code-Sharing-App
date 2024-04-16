import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components.
import Navbar from './comps/Navbar';

// Pages.
import Home from './pages/Home';

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Logout from './pages/auth/Logout';

// Snippets.

import Preview from './pages/snippets/Preview';
import Mysnippets from './pages/snippets/Mysnippets';

// Contexts.
import { RootProvider } from './contexts/Root';

const App = () => {
  return (
    <RootProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />

          <Route path='/snippets' element={<Mysnippets />} />
          <Route path='/:str' element={<Preview />} />


        </Routes>
      </BrowserRouter>
    </RootProvider>
  )
}

export default App;