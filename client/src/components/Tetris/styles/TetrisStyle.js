import styled from 'styled-components'
import bgImage from '../bg.png'

export const StyledTetrisWrapper = styled.div`
    position: relative;
    margin 0 auto;
    width: 100vw;
    height: 94.5vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;
`

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px;
    margin: 0 auto;
    max-width: 50vw;

    aside {
        width: 100%;
        max-width: 150px;
        display: block;
        padding: 0 20px;
    }
`