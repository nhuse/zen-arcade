import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris } from './styles/TetrisStyle'
import { StyledTetrisWrapper } from './styles/TetrisStyle'
import { useEffect, useState } from 'react'
import { useInterval } from './hooks/useInterval'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'
import { createStage, collisionDetection } from './gameHelpers'
import { useGameStatus } from './hooks/useGameStatus'

export default function Tetris({ gameId, user }) {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameover] = useState(false)

    const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    function movePlayerLeftRight(direction) {
        if(!collisionDetection(player, stage, { x: direction, y: 0 })) {
            updatePlayerPosition({ x: direction, y: 0 })
        }
    }
    
    function startGame() {
        //Reset Game
        setStage(createStage());
        setDropTime(1000)
        resetPlayer();
        setGameover(false);
        setScore(0)
        setRows(0)
        setLevel(0)
    }

    function drop() {
        //Increase level when player clears 10 rows
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)

            setDropTime(1000 / (level + 1) + 200)
        }
        if (!collisionDetection(player, stage, { x: 0, y: 1 })) {
            updatePlayerPosition({ x: 0, y: 1, collided: false })
        } else {
            if(player.pos.y < 1) {
                setGameover(true);
                setDropTime(null);
            }
            updatePlayerPosition({ x: 0, y: 0, collided: true }) 
        }
    }

    useEffect(() => {
        if(gameOver && score > 0 && user) {
            let scoreData={
                game_id: gameId,
                user_id: user.id,
                score: score
            }
            fetch('/scores', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(scoreData)
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
        }
    }, [score, gameOver])

    function keyDepressed({ keyCode }) {
        if(!gameOver){
            if(keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200)
            }
        }
    }

    function dropPlayer() {
        setDropTime(null)
        drop();
    }

    function move({ keyCode }) {
        if(!gameOver) {
            if(keyCode === 37) {
                movePlayerLeftRight(-1);
            } else if (keyCode === 39) {
                movePlayerLeftRight(1)
            } else if (keyCode === 40) {
                dropPlayer(1)
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop()
    }, dropTime)

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyDepressed}>
            <StyledTetris>
                <aside>
                    <div style={{color: "#999", textAlign: "center", border: "4px solid grey", borderRadius: "20px", marginBottom: "20px", marginRight: "10px"}}>
                        <h1 style={{ margin: "5px 0", fontWeight: "bold", textDecoration: "underline" }}>Instructions</h1>
                        <ul style={{padding: "0", listStyle: "none" }}>
                            <li><h2 style={{margin: '5px', fontSize: "15px" }}>Start a new game</h2> 
                                SPACE
                            </li> <br/>
                            <li><h2 style={{margin: '5px', fontSize: "15px" }}>Move Tetrominos</h2> 
                                LEFT/RIGHT arrow keys
                            </li> <br/>
                            <li><h2 style={{margin: '5px', fontSize: "15px" }}>Rotate Tetrominos</h2>  
                                UP arrow key
                            </li> <br/>
                            <li style={{ marginLeft: '5px', marginRight: '5px', fontSize: "15px" }}>Once 10 rows are cleared, the level and speed will increase. Be careful and have fun!</li>
                        </ul>
                    </div>
                </aside>
                <Stage stage={stage}/>
                <aside>
                    { gameOver ? <Display gameOver={gameOver} text={"Game Over"}/> :
                    <div style={{ wordBreak: "break-word", maxWidth: "300px" }}>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    }
                    <StartButton onClick={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}