import './App.css';
import { useEffect, useState } from "react"
import { Switch, Route, useParams } from "react-router-dom"
import NavBar from './components/NavBar'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import GameRender from './components/GameRender';
import Reviews from './components/Reviews'
import Profile from './components/Profile';
import logo from './components/styles/IMG_0249.jpg'

function App() {
  const [user, setUser] = useState(null)
  const [gameId, setGameId] = useState()
  const [reviews, setReviews] = useState([])
  const [games, setGames] = useState([])

  useEffect(async() => {
    // auto-login
    await fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
  
          setUser(user)
        });
      }
    });
  }, []);


  useEffect(() => {
    // Get games data from backend
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [])

  useEffect(() => {
    // Get reviews from backend
    fetch(`/reviews`)
    .then(resp => resp.json())
    .then(data => setReviews(data))
  }, [])

  if(!user) {
    return (
      <div style={{ backgroundColor: "black" }}>
        <div style={{ paddingBottom: "10px" }}>
          <NavBar user={user} setUser={setUser} setGameId={setGameId} />
        </div>
        <img src={logo} id="logo" style={{paddingBottom: "20px"}} />
        <Switch>
          <Route path="/log_in">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
        </Switch>
      </div>
    )
  }
  return (
    <div style={{ backgroundColor: "black" }}>
      <div>
        <NavBar user={user} setUser={setUser} setGameId={setGameId} />
      </div>
      <Switch>
        <Route path={`/game/:game_id`} >
          <GameRender gameId={gameId} user={user} />
        </Route>
        <Route exact path="/home">
          <Dashboard games={games} setGames={setGames} user={user} setGameId={setGameId} />
        </Route>
        <Route path="/profile">
          <Profile reviews={reviews} setUser={setUser} user={user} games={games} setReviews={setReviews} />
        </Route>
        <Route exact path={`/game_reviews/:game_id`}>
          <Reviews reviews={reviews} setReviews={setReviews} gameId={gameId} userId={user.id} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
