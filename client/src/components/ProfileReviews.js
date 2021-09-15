import SingleReview from "./SignleReview"

export default function ProfileReviews({userReviews, game, setReviews }) {
    const filteredReviews = userReviews.filter(r => r.game_id === game.id)

    return (
        <div key={game.id} className="profile-game-reviews-wrapper">
            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
            <ul className="profile-game-reviews-ul">
                {filteredReviews.map(r => {
                    return <SingleReview key={r.id} setReviews={setReviews} r={r} />
                })}
            </ul> <br/>
        </div>
    )
}