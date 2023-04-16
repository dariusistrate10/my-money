import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup'

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={user && <Home />}/>
            <Route path='/login' element={!user && <Login /> }/>
            <Route path='/signup' element={!user && <Signup /> }/>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
