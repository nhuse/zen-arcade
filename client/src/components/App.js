import '../App.css';
import { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import Login from './Login'
import Dashboard from './Dashboard'
import FreeHome from './FreeHome'
import Register from './Register'
import GameRender from './GameRender';
import Reviews from './Reviews'
import Profile from './Profile';

function App() {
  const [user, setUser] = useState(null)
  const [gameId, setGameId] = useState()
  const [reviews, setReviews] = useState([])
  const [games, setGames] = useState([])
  const [asteroidsHS, setAsteroidsHS] = useState()

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
  
          setUser(user)
        });
      }
    });
  }, []);


  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [])

  useEffect(() => {
    fetch(`/reviews`)
    .then(resp => resp.json())
    .then(data => setReviews(data))
  }, [])

  useEffect(() => {
    setGameId(null)
  }, [user])

  console.log(`app ${gameId}`)
  if(!user) {
    return (
      <div style={{ backgroundColor: "black", height: "100vh" }}>
        <div>
          <NavBar user={user} setUser={setUser} setGameId={setGameId} />
        </div>
        <Switch>
          <Route exact path="/" >
            <FreeHome />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route path="/games">
            <Dashboard games={games} user={user} setGameId={setGameId} />
          </Route>
        </Switch>
      </div>
    );
  }
    return (
      <div style={{ backgroundColor: "black", height: "100vh" }}>
        <div>
          <NavBar user={user} setUser={setUser} setGameId={setGameId} />
        </div>
        <Switch>
        <Route exact path="/" >
            <FreeHome />
          </Route>
          <Route exact path={`/games/${gameId}`} >
            <GameRender gameId={gameId} user={user} setAsteroidsHS={setAsteroidsHS} />
          </Route>
          <Route exact path="/games">
            <Dashboard games={games} setGames={setGames} user={user} setGameId={setGameId} />
          </Route>
          <Route path="/profile">
            <Profile reviews={reviews} user={user} games={games} setReviews={setReviews} />
          </Route>
          <Route exact path={`/games/${gameId}/reviews`}>
            <Reviews reviews={reviews} setReviews={setReviews} gameId={gameId} userId={user.id} />
          </Route>
        </Switch>
      </div>
    )
}

export default App;
