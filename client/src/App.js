import './App.css';
import { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import NavBar from './components/NavBar'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import GameRender from './components/GameRender';
import Reviews from './components/Reviews'
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null)
  const [gameId, setGameId] = useState()
  const [reviews, setReviews] = useState([])
  const [games, setGames] = useState([])
  const [asteroidsHS, setAsteroidsHS] = useState()

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
        <NavBar user={user} setUser={setUser} setGameId={setGameId} />
        <h1 style={{color: "white", marginTop: "0", textAlign: "center" }}>Please log in or register to play games!</h1>
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
    <div style={{ backgroundColor: "black", height: "100vh" }}>
    <div>
      <NavBar user={user} setUser={setUser} setGameId={setGameId} />
    </div>
    <Switch>
      <Route path="/log_in">
        <Login setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <Route exact path={`/game/${gameId}`} >
        <GameRender gameId={gameId} user={user} setAsteroidsHS={setAsteroidsHS} />
      </Route>
      <Route exact path="/home">
        <Dashboard games={games} setGames={setGames} user={user} setGameId={setGameId} />
      </Route>
      <Route path="/profile">
        <Profile reviews={reviews} user={user} games={games} setReviews={setReviews} />
      </Route>
      <Route exact path={`/game/${gameId}/reviews`}>
        <Reviews reviews={reviews} setReviews={setReviews} gameId={gameId} userId={user.id} />
      </Route>
    </Switch>
    <Redirect to="/home" />
    </div>
  )
}

export default App;
