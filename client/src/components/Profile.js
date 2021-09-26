import { useState, useEffect } from 'react'
import ProfileReviews from './ProfileReviews'
import './styles/ProfileStyle.css'

export default function Profile({ setUser, reviews, user, games, setReviews }){
    const [userScores, setUserScores] = useState([])
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [avatar, setAvatar] = useState('');
    // Default profile picture
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'

    if(user.profile_img) {
        userImg = user.profile_img
    }
    
    //Fetch all the current user's high scores
    useEffect(() => {
        fetch(`/scores/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserScores(data))
    }, [])
        
    let userReviews = []
    // Filter reviews by user
    if(reviews) {
        userReviews = reviews.filter(r => r.user_id === user.id)
    }

    
    async function handleAvatarSubmit(e) {
        e.preventDefault();
          
        await fetch(`user/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            profile_img: avatar
        }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user));
    }
        

    return (
        <div id="profile-wrapper" >
            <div className="edit-profile-avi">
                <img alt={"avatar"} src={userImg} style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
                <form onSubmit={handleAvatarSubmit}>
                    <input
                        name="avatar"
                        type="text"
                        value={avatar}
                        onChange={(e) => {
                            console.log(avatar)
                            setAvatar(e.target.value)}
                        }
                        placeholder="Update Avatar URL"
                    />
                    <button>Submit</button>
                </form>
            </div>
            <div className="all-user-reviews-wrapper">
                <h1>{user.name}'s Reviews</h1>
                <div className="reviews-lists">
                {games.map(game => {
                    return <ProfileReviews key={game.id} game={game} setReviews={setReviews} userReviews={userReviews} />
                })}
                </div>
            </div>

            <div className="all-user-highscores-wrapper">
                <h1>{user.name}'s Scores</h1>
                <div className="score-lists">
                {games.map(game => {
                    const filteredScores = userScores.filter(r => r.game_id === game.id)
                    return (
                        <div key={game.id} className="profile-game-scores-wrapper">
                            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
                            <ul className="profile-game-scores-ul">
                                {filteredScores.map(s => {
                                    let date = new Date(s.created_at)
                                    let day = date.getDate()
                                    let month = months[date.getMonth()]
                                    let year = date.getFullYear()
                                    const dateString = `${month} ${day}, ${year}`
                                    return (
                                        <li key={s.id} className="profile-game-scores-li">
                                            {s.score} points on {dateString}
                                        </li>
                                    )
                                })}
                            </ul> <br/>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}
