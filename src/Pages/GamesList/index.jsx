import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";   
import gamesService from '../../Services/games.service';
 
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
      <div className="game-list-page">
      {games.map((game)=>{
          return(
              <div className="card" key={game._id}>
                  <Link to={`/games-list/${game._id}`}>
                      <h3>{game.title}</h3>
                  </Link>
              </div>
          )
      })}
      </div>
  )

}

