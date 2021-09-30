import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import './styles/NavBarStyles.css'
import logo from './styles/IMG_0254.jpg'


export default function NavBar({ user, setUser, setGameId }) {
    const history = useHistory()
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'

    function handleLogoutClick() {
        // Logout functionality. Deletes session cookie from the back end.
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

    if(user) {
        if(user.profile_img) {
            userImg = user.profile_img
        }
    }
    
    return (
        <nav className="nav-bar" >
            { user ? 
            (<>
            <button className="nav-button" >
                <NavLink exact to="/"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Home
                </NavLink>
            </button >
            <button onClick={handleLogoutClick} className="logout-button" >Logout</button>
            <button className="nav-button" id="profile-wrapper-button" >
                <NavLink to="/profile"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Hello, {user.name}
                </NavLink> 
                <img src={userImg} className="profile-pic" alt="Profile"/>
            </button>
            <img src={logo} style={{height: "50%", marginLeft: "50px"}} />
            </>) 
            : 
            (<>
            <button className="nav-button" >
                <NavLink exact to="/"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Home
                </NavLink>
            </button >
            <button className="nav-button" >
                <NavLink to="/log_in"
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
            <img src={logo} style={{height: "50%", marginLeft: "50px"}} />
            </>)}
        </nav>
    )
}
