import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";   
import gamesService from '../../Services/games.service';
import SideNav from '../../Components/SideNav'
import Nav from '../../Components/Nav'
import '../../App.css'
 
export default function GamesListPage(){
  const [games, setGames] = useState([]);

  // function that gets projects via axios
  const getAllGames = () => {
      gamesService.getAllGames()
      .then((response)=> setGames(response.data))
      .catch((error)=>console.log(error));
  }; 
  // setting a side-effect after initial rendering of component that is 
  // calling getAllGames function
  useEffect(()=>{
      getAllGames();
  }, []);

  return(
    <div className="game-list-page d-flex">
    <div>
        <SideNav/>
    </div>
    <div className="games-div">
        <Nav/>
    <div className="games-list">
      {games.map((game)=>{
          return(
              <div className="card d-inline-flex justify-content-center m-2 mt-5" key={game._id}>
                  <Link to={`/games/${game._id}`}>
                      <img src={game.thumbnail} class="card-img-top thumbnail" alt="..."></img>
                      <div class="card-body">
                        <h5 class="card-title title">{game.title}</h5>
                     </div>
                  </Link>
              </div>
          )
      })}
      </div>
      </div>
      </div>
  )

}

