export const TETROMINOS = {
    0: { shape: [[0]], 
        color: '0, 0, 0'},
    I: { shape: [
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0]
        ], color: '3, 65, 174'},

    J: { shape: [
        [0, 'J', 0],
        [0, 'J', 0],
        ['J', 'J', 0]
    ], color: '255, 213, 0'},

    L: { shape: [
        [0, 'L', 0],
        [0, 'L', 0],
        [0, 'L', 'L']
    ], color: '255, 151, 28'},

    O: { shape: [
        ['O', 'O'],
        ['O', 'O']
    ], color: '114, 203, 59'},
    
    S: { shape: [
        [0, 'S', 'S'],
        ['S', 'S', 0],
        [0, 0, 0]
    ], color: '255, 50, 19'},

    Z: { shape: [
        ['Z', 'Z', 0],
        [0, 'Z', 'Z'],
        [0, 0, 0]
    ], color: '3, 65, 174'},

    T: { shape: [
        ['T', 'T', 'T'],
        [0, 'T', 0],
        [0, 0, 0]
    ], color: '255, 213, 0'}
}

export function randomTetromino() {
    const tetrominos = 'IJLOSZT'
    const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)]

    return TETROMINOS[randomTetromino]
}