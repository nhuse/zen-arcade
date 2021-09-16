import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import Snake from './Snake/Snake'
import { useEffect, useState } from 'react'
import { Reacteroids } from './Asteroids/Reacteroids'
import React from 'react';
import { useParams } from 'react-router-dom'
import '../components/Asteroids/style.css';

export default function GameRender({ gameId, user, setAsteroidsHS }) {
    let { game_id } = useParams();
    console.log(`gameRender ${game_id}`)
    const [hiScores, setHiScores] = useState([])
        useEffect(() => {
            if(game_id) {
                fetch(`/scores/${game_id}`)
                .then(resp => resp.json())
                .then(data => {
                    setHiScores(data)
                })
            }
        }, [])

    if (game_id === '1') {
        return <Tetris user={user} hiScores={hiScores} gameId={gameId} />
    } else if (game_id === '2') {
        return <Reacteroids setAsteroidsHS={setAsteroidsHS} />
    } else if (game_id === '3') {
        return <Snake hiScores={hiScores} gameId={gameId} user={user} />
    }
}