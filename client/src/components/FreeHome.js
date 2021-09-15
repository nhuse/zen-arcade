import NavBar from "./NavBar"
import Login from "./Login"

export default function FreeHome({ user, setUser, setGameId }) {
    return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
        <h1 style={{color: "white", marginTop: "0", textAlign: "center" }}>Please log in to play games!</h1>
        <Login setUser={setUser} />
    </div>
    )
}