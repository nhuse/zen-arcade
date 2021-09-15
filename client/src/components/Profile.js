import { useState, useEffect } from 'react'
import './styles/ProfileStyle.css'

export default function Profile({ setUser, reviews, user, games, setReviews }){
    const [userScores, setUserScores] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState({
        review: ''
    })
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const [avatar, setAvatar] = useState('');
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'

    if(user.profile_img) {
        userImg = user.profile_img
    }
    
    useEffect(() => {
        fetch(`/scores/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserScores(data))
    }, [])

    async function handleDelete(id) {
        await fetch(`/reviews/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setReviews(data)
        })
    }
    
    async function handleEdit() {
        setIsEditing(true)
    }
    
    function handleChange(e){
        setEditedReview({
            [e.target.name]: e.target.value
        })
    }
    
    async function handleSubmitEdit(e, id) {
        e.preventDefault()
        await fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedReview)
        })
        .then(response => response.json())
        .then(data => {
            setReviews(data)
            setIsEditing(false)
        })
        setEditedReview({review: ''})
    }
        
    let userReviews = []
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
                <h1>Your Reviews</h1>
                <div className="reviews-lists">
                {games.map(game => {
                    const filteredReviews = userReviews.filter(r => r.game_id === game.id)
                    return (
                        <div key={game.id} className="profile-game-reviews-wrapper">
                            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
                            <ul className="profile-game-reviews-ul">
                                {filteredReviews.map(r => {
                                    let date = new Date(r.created_at)
                                    let day = date.getDate()
                                    let month = months[date.getMonth()]
                                    let year = date.getFullYear()
                                    const dateString = `${month} ${day}, ${year}`
                                    return (
                                        <li key={r.id} className="profile-game-reviews-li">
                                            {isEditing ? (
                                                <form onSubmit={(e) => handleSubmitEdit(e, r.id)} className="login-signup-form">
                                                    <textarea rows="5" cols="50" name="review" value={editedReview.review} onChange={handleChange} style={{ width: "250px", height: "100px" }}/><br/>
                                                    <button>Submit Edit</button>
                                                </form>) 
                                                : <>"{r.review}" on {dateString}</> }
                                            <div style={{padding: "10px 0 10px 0" }}>
                                                <button style={{ marginRight: "15px" }} onClick={() => handleDelete(r.id)}>🗑️</button>
                                                <button onClick={() => handleEdit(r.id)}>✏️</button>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul> <br/>
                        </div>
                    )
                })}
                </div>
            </div>

            <div className="all-user-highscores-wrapper">
                <h1>Your Scores</h1>
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