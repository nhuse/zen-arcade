import { StyledDisplay } from "./styles/StyledDisplay"

export default function Display({ text, gameOver }) {
    return <StyledDisplay game={gameOver}>{text}</StyledDisplay>
}