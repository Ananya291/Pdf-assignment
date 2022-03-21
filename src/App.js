import './App.css';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './Login';
import Home from './Home';

function App() {
  const [user] = useAuthState(auth);
  return (
    user ? <Home/> : <Login/>
  );
}

export default App;
