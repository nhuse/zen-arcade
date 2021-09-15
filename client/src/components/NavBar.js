import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import './styles/NavBarStyles.css'

export default function NavBar({ user, setUser, setGameId }) {
    const history = useHistory()
    let userImg;
    function handleLogoutClick() {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setUser(null);
                setGameId(null)
                history.push('/')
            }
        });          
    }

    // function handleClick() {
    //     setGameId(null)
    // }
    if(user){
        if(user.profile_img) {
            userImg = user.profile_img
        } else {
            userImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'
        }
    }
    return (
        <nav className="nav-bar" >
            { user ? 
            (<>
            <button className="nav-button" >
                <NavLink exact to="/games"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Home
                </NavLink>
            </button >
            <button onClick={handleLogoutClick} className="logout-button" >Logout</button>
            <button className= "nav-button" id="profile-wrapper" >
                <NavLink to="/profile"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Hello, {user.name}
                </NavLink> 
                <img src={userImg} className="profile-pic" alt="Profile"/>
            </button>
            </>) 
            : 
            (<>
            <button className="nav-button" >
                <NavLink to="/login"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Login
                </NavLink>
            </button>
            <button className= "nav-button" >
                <NavLink to="/register"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Register
                </NavLink> 
            </button> 
            </>)}
        </nav>
    )
}