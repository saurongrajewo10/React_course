import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={props.clickVariable}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    state = {
        squares: Array(9).fill(null),
        nextPlayer: 'X',
        listX: [],
        list0: [],
    };

    calculatingWhoWins() {
        let winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
if (this.state.listX.length >2 ) {
    const foundX = this.state.listX.some(r=> winningCombination.includes(r))
    return 'Winner player X'
}
if (this.state.list0.length>2) {
    const found0 = this.state.list0.some(r=> winningCombination.includes(r))
    return 'Winner player 0'
}


    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                clickVariable={() => this.handleClick(i)}
            />
        );
    }

    handleClick = (i) => {
        const squares = this.state.squares.slice();
        if (squares[i] === null) {
            squares[i] = this.state.nextPlayer;
            this.setState({ nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X' });
            this.setState({ squares: squares },
                () => {
                    if (this.state.squares[i] === 'X') {
                        let temporaryListX = this.state.listX;
                        temporaryListX.push(i);
                        this.setState({ listX: temporaryListX.sort() });
                        console.log(this.state.listX)
                    }
                    else {
                        let temporaryList0 = this.state.list0;
                        temporaryList0.push(i);
                        this.setState({ list0: temporaryList0.sort() });
                        console.log(this.state.list0)
                    }
                    this.calculatingWhoWins();
                }
            );
        }
    }

    render() {
        const status = 'Next player: ' + this.state.nextPlayer;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
