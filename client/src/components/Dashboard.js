import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles/GameCardStyles.css'

export default function Dashboard({ games, setGameId }) {
    const [gameScores, setGameScores] = useState([])

    function handleGameClick(id) {
        setGameId(id)
    }

    useEffect(() => {
        fetch(`/game_scores`)
        .then(resp => resp.json())
        .then(data => setGameScores(data))
    }, [])

    console.log(gameScores)

    return (
        <div className="game-flex-container">
            {games.map((game) => {
                const filteredScores = gameScores.filter(score => score.game_id === game.id)
                return (
                    <div key={game.id} className="card" onClick={() => handleGameClick(game.id)}>
                        <Link to={`/game/${game.id}`} style={{ textDecoration: "none" }}>
                            <div className="game-info">
                                <img src={game.game_image_url} className="game-img" alt={`${game.name}-cover-art`} />
                                <h1>{game.name}</h1>
                                <p style={{ paddingBottom: "10px" }}>Genre: {game.genre}</p>
                            </div>
                        </Link>
                        <button className="review-button">
                            <Link to={`/game_reviews/${game.id}`}
                            style={{ color: "grey" }}
                            activeStyle={{ fontWeight: "bold", color: "black" }} >
                                Reviews
                            </Link>
                        </button>
                        <div className="game-card-highscore-wrapper">
                            <h2 style={{ marginBottom: "10px", textDecoration: "underline" }}>Highscores</h2>
                            <ul style={{ padding: "0px", marginTop: "0px" }}>
                                {filteredScores.slice(0,5).map((score)=> {
                                    let userImg;
                                    if(score.user.profile_img) {
                                        userImg = score.user.profile_img
                                    } else {
                                        userImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'
                                    }
                                    return (<li key={score.id} style={{ display: "flex", justifyContent: "center", lineHeight: "28px", padding: "6px", wordBreak: "break-word" }} >
                                    <img src={userImg} className="profile-pic" alt="profile-pic" style={{ marginRight: "5px" }}/>
                                    {score.user.username}: {score.score}
                                    </li>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                    </div>
                )   
            })}
        </div>
    )
}