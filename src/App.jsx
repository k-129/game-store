import GamesListPage from './Pages/GamesList'
import GameDetailsPage from './Pages/GameDetails'
import HomePage from './Pages/Homepage'
/* import LoginPage from './Pages/Login';
 */
import './App.css'
import { Routes, Route} from 'react-router-dom';
import NavBar from './Components/Navbar'
import SideNav from './Components/SideNav'


function App() {

  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/games" element={<GamesListPage/>} />
      <Route path="/games/:gameId" element={<GameDetailsPage/>}/>
    </Routes>
    </div>
  )
}

export default App