import styled from 'styled-components'
import bgImage from '../bg.png'

export const StyledTetrisWrapper = styled.div`
    position: relative;
    margin 0 auto;
    width: 100vw;
    height: 95vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;
`

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 700px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`