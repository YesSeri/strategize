'use strict'
// Remember that spy beats marshal, and miner beats bomb.
const pieceValueEnum = Object.freeze({
    spy: 0,
    scout: 1,
    miner: 2,
    sergeant: 3,
    lieutenant: 4,
    captain: 5,
    major: 6,
    colonel: 7,
    general: 8,
    marshal: 9,
})
const colorEnum = Object.freeze({
    RED: "R",
    BLUE: "B",
    EMPTY: "-",
    ILLEGAL: "X",
})
class Player {
    constructor(color) {
        // if (color !== 'blue' || color !== 'red') throw new Error('invalid color')
        this.color = color
        this.piecesToPlace = piecesToPlace();
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Piece {
    constructor(color, value) {
        this.color = color;
        if (this.color !== colorEnum.BLUE && color !== colorEnum.RED) {
            this.value = null;
        } else {
            this.value = value;
        }
    }
}

class Game {
    constructor() {
        this.board = [];
        const emptySquare = new Piece(colorEnum.EMPTY)
        const illegalSquare = new Piece(colorEnum.ILLEGAL)

        for (let i = 0; i < 10; i++) {
            this.board[i] = [];
            for (let j = 0; j < 10; j++) {
                if ((i > 3 && i < 6) && (j == 2 || j == 3 || j == 6 || j == 7)) {
                    this.board[i][j] = { ...illegalSquare };
                } else {
                    this.board[i][j] = { ...emptySquare };
                }
            }
        }
        this.p1 = new Player(colorEnum.BLUE)
        this.p2 = new Player(colorEnum.RED)
    }
    // Blue is top side, red is bottom side.
    place(piece, point, player) {
        if (piece.color === colorEnum.EMPTY, piece.color === colorEnum.ILLEGAL) throw new Error("Is not a piece")
        if (player.color === colorEnum.BLUE && point.y > 3) throw new Error("Can't place blue here")
        if (player.color === colorEnum.RED && point.y < 6) throw new Error("Can't place red here")
        const { x, y } = point
        if (player.piecesToPlace[piece] > 0) {
            this.board[y][x] = piece
            player.piecesToPlace[piece] -= 1;
        }
    }
    randomizePlacement(player) {
        if (player.color === colorEnum.BLUE) {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 10; x++) {
                    if (this.board[y][x].color === colorEnum.EMPTY) {
                        const piece = this.getRandomPiece(this.p1)
                        this.place(piece, new Point(x, y), player);
                        debugger;
                    }
                }
            }
        } else {

        }

    }
    getRandomPiece(player) {
        const pieceArray = player.piecesToPlace.map((el, i) => {
            // console.log({el, i})
            let arr = [];
            for (let j = 0; j < el; j++) {
                arr.push(i);
            }
            return arr
        }).flat();
        const randomArrValue = pieceArray[Math.floor(Math.random() * pieceArray.length)];
        const randomPiece = new Piece(player.color, randomArrValue)
        return randomPiece;
    }
    print() {
        let i = 0;
        console.log(" ", 0, "", 1, "", 2, "", 3, "", 4, "", 5, "", 6, "", 7, "", 8, "", 9)
        for (const row of this.board) {
            let s = String(i) + " ";
            for (const square of row) {
                s += square?.value ? square.color + square.value : square.color + square.color
                s += " "
            }
            console.log(s)
            i++;
        }
    }
}
function piecesToPlace() {
    return [1, 6, 5, 5, 4, 4, 3, 2, 1, 1];
}

const game = new Game();
// game.print();
game.randomizePlacement(game.p1);
game.print();