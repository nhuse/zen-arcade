import { Link } from 'react-router-dom'
import './styles/GameCardStyles.css'

export default function Dashboard({ games, setGameId }) {
    console.log(games)
    function handleGameClick(id) {
        setGameId(id)
    }

        return (
            <div className="game-flex-container">
                {games.map((game) => (
                    <div key={game.id} className="card" onClick={() => handleGameClick(game.id)}>
                        <Link to={`/game/${game.id}`} style={{ textDecoration: "none" }}>
                            <div className="game-info">
                                <img src={game.game_image_url} className="game-img" alt={`${game.name}-cover-art`} />
                                <h1>{game.name}</h1>
                                <p style={{ paddingBottom: "10px" }}>Genre: {game.genre}</p>
                            </div>
                        </Link>
                        <button className="review-button">
                            <Link to={`game/${game.id}/reviews`}
                            style={{ color: "grey" }}
                            activeStyle={{ fontWeight: "bold", color: "black" }} >
                                Reviews
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        )
}