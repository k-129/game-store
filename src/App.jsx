import HomePage from './Pages/Homepage'

import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/Profile';
import EditProfilePage from './Pages/EditProfile';

import GamesListPage from './Pages/GamesList'
import GameDetailsPage from './Pages/GameDetails'
import EditGameDetailsPage from './Pages/EditGame';
import AddGame from './Pages/AddGame';

import NavBar from './Components/Navbar'
import IsPrivate from './Components/IsPrivate';
import IsAnon from './Components/IsAnon';

import './App.css'

import { Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />

      <Route path="/games" element={<GamesListPage/>} />
      <Route path="/games/:gameId" element={<GameDetailsPage/>}/>
      <Route path="/games/edit/:gameId" element={<IsPrivate><EditGameDetailsPage/></IsPrivate>}/>
      <Route path="/add-game" element={<IsPrivate><AddGame/></IsPrivate>}/>

      <Route path="/signup" element={<IsAnon><SignUpPage/></IsAnon>}/>
      <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>} />

      <Route path="/profile" element={<IsPrivate><ProfilePage/></IsPrivate>} />
      <Route path="/edit-profile" element={<IsPrivate><EditProfilePage/></IsPrivate>} />

    </Routes>
    </div>
  )
}

export default App
