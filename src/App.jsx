import HomePage from './Pages/Homepage'

import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/Profile';
import EditProfilePage from './Pages/EditProfile';

import GamesListPage from './Pages/GamesList'
import GameDetailsPage from './Pages/GameDetails'
import EditGameDetailsPage from './Pages/EditGame';
import AddGame from './Pages/AddGame';

import IronGamesListPage from './Pages/IronGamesList'
import IronGameDetailsPage from './Pages/IronGameDetails'
import IronEditGamePage from './Pages/IronEditGame';
import IronAddGame from './Pages/IronAddGame';

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

      <Route path="/ironhack/games" element={<IronGamesListPage/>} />
      <Route path="/ironhack/games/:gameId" element={<IronGameDetailsPage/>}/>
      <Route path="/ironhack/games/edit/:gameId" element={<IsPrivate><IronEditGamePage/></IsPrivate>}/>
      <Route path="/ironhack/add-game" element={<IsPrivate><IronAddGame/></IsPrivate>}/>

      <Route path="/add-favorites/:userId/:gameId" element={<IsPrivate><IronAddGame/></IsPrivate>}/>
      <Route path="/remove-favorites/:userId/:gameId" element={<IsPrivate><IronAddGame/></IsPrivate>}/>

      <Route path="/signup" element={<IsAnon><SignUpPage/></IsAnon>}/>
      <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>} />

      <Route path="/profile/:userId" element={<IsPrivate><ProfilePage/></IsPrivate>} />
      <Route path="/profile/edit/:userId" element={<IsPrivate><EditProfilePage/></IsPrivate>} />

    </Routes>
    </div>
  )
}

export default App
