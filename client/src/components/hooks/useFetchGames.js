import { useEffect, useState } from "react"

export function useFetchGames() {
    const [games, setGames] = useState()
    useEffect(() => {
        fetch('/games')
        .then(resp => resp.json())
        .then(data => setGames(data))
    }, [games])

    return [games]
}