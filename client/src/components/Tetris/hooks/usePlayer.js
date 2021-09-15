import { useCallback, useState } from "react";
import { STAGE_WIDTH, collisionDetection } from "../gameHelpers";

import { randomTetromino, TETROMINOS } from "../tetriminos";

export function usePlayer() {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    })

    function rotate(player, direction) {
        const rotatedPlayer = player.map((_, index) => player.map(column => column[index]))

        if(direction > 0) {
            return rotatedPlayer.map(row => row.reverse())
        }
        return rotatedPlayer.reverse();
    }

    function playerRotate(stage, direction) {
        const clonePlayer = JSON.parse(JSON.stringify(player))
        clonePlayer.tetromino = rotate(clonePlayer.tetromino, direction)

        const position = clonePlayer.pos.x
        let offset = 1;
        while(collisionDetection(clonePlayer, stage, { x:0, y: 0 })) {
            clonePlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > clonePlayer.tetromino[0].length) {
                rotate(clonePlayer.tetromino, -direction)
                clonePlayer.pos.x = position
                return
            }
        }
        setPlayer(clonePlayer)
    }

    function updatePlayerPosition({ x, y, collided }) {
        setPlayer(lastPlayer => ({
            ...lastPlayer,
            pos: {x: (lastPlayer.pos.x += x), y: (lastPlayer.pos.y += y)},
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])
    return [player, updatePlayerPosition, resetPlayer, playerRotate]
}
