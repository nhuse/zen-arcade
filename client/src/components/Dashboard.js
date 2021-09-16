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
                                {filteredScores.slice(0,5).map((score)=>{
                                    return (
                                        <li key={score.id}>{score.user.username}: {score.score}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )   
            })}
        </div>
    )
}