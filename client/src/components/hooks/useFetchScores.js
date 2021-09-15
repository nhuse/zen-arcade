import { useEffect, useState } from "react";

export function useFetchScores(gameId) {
    console.log(gameId)
    const [gameScores, setGameScores] = useState()
    useEffect(() => {
        fetch(`/scores/${gameId}`)
        .then(resp => resp.json())
        .then(data => setGameScores(data))
    }, [])
    return [gameScores]
}