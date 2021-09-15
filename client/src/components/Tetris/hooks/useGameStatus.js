import { useState, useEffect, useCallback } from "react";

export function useGameStatus(rowsCleared) {
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)

    const linePoints = [40, 100, 300, 1200]

    const calcScore = useCallback(() => {
        if(rowsCleared > 0) {
            setScore(previous => previous + linePoints[rowsCleared - 1] * (level+1))
            setRows(previous => previous + rowsCleared)
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore()
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel]
}