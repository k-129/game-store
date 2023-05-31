import GamesListPage from './Pages/GamesList'
import GameDetailsPage from './Pages/GameDetails'
import HomePage from './Pages/Homepage'
import SignUpPage from './Pages/SignUp';
/* import LoginPage from './Pages/Login';
 */
import './App.css'
import { Routes, Route} from 'react-router-dom';

import NavBar from './Components/Navbar'
/* import IsPrivate from './Components/IsPrivate';
import IsAnon from './Components/IsAnon'; */

function App() {

  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/games-list" element={<GamesListPage/>} />
      <Route path="/signup" element={<IsAnon><SignUpPage/></IsAnon>}/>
      <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>}/>
    </Routes>
    </div>
  )
}

export default App
