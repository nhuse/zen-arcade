import React from 'react'
import { StyledCell } from './styles/CellStyle'
import { TETROMINOS } from './tetriminos'

function Cell({ type }) {
    return <StyledCell type={type} color={TETROMINOS[type].color}/>
}

export default React.memo(Cell)