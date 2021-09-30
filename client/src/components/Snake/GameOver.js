import React, {useEffect} from 'react'

function GameOver(props) {

  useEffect(()=>{
    if(props.score > 0 && props.user) {
      fetch('/scores', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            game_id: props.gameId,
            user_id: props.user.id,
            score: props.score
        })
      })
    }
  }, [props.score])

  return (
    <div
      id='GameBoard'
      style={{
        width: props.width,
        height: props.height,
        borderWidth: props.width / 50,
        color: "white"
      }}>
      <div id='GameOver' style={{ fontSize: props.width / 15 }}>
        <div id='GameOverText'>GAME OVER</div>
        <div>Your score: {props.score}</div>
        <div>
          {props.newHighScore ? 'New local ' : 'Local '}high score:{' '}
          {props.highScore}
        </div>
        <div id='PressSpaceText'>Press Space to restart</div>
      </div>
    </div>
  )
}

export default GameOver