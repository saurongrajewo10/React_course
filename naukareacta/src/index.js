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
        winner: null,
    };

    historyMoves = [];
    historyMovesCounter = 2;

    goingBackToPreviousMove = () => {
        if (this.historyMovesCounter <= this.historyMoves.length) {
            const tempState = this.historyMoves[
                this.historyMoves.length -
                this.historyMovesCounter];
            this.setState({ squares: tempState },
                () => {
                    this.historyMovesCounter++;
                }
            )
        }
    }

    calculatingWhoWins(checkedFields, playerSymbol) {
        let winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        if (checkedFields.length > 2) {
            for (const combination of winningCombinations) {
                let howManyFound = 0;
                for (const combinationElement of combination) {
                    if (!checkedFields.includes(combinationElement)) {
                        break;
                    } else {
                        howManyFound++;
                    }
                }
                if (howManyFound === 3) {
                    this.setState({ winner: playerSymbol }, () => {
                        window.alert('Player ' + this.state.winner + ' wins!!!!!!!');
                    });
                    break;
                }
            }
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
        if (squares[i] === null && !this.state.winner) {
            squares[i] = this.state.nextPlayer;
            this.setState({ nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X' });
            this.setState({ squares: squares },
                () => {
                    this.historyMoves.push(this.state.squares);
                    if (this.state.squares[i] === 'X') {
                        let temporaryListX = this.state.listX;
                        temporaryListX.push(i);
                        this.setState({ listX: temporaryListX.sort() });
                        console.log(this.state.listX);
                        this.calculatingWhoWins(this.state.listX, 'X');
                    }
                    else {
                        let temporaryList0 = this.state.list0;
                        temporaryList0.push(i);
                        this.setState({ list0: temporaryList0.sort() });
                        console.log(this.state.list0);
                        this.calculatingWhoWins(this.state.list0, '0');
                    }
                    console.log(this.historyMoves)
                }
            );
        }
        else if (squares[i] !== null) {
            window.alert('To pole zostało juz wybrane');
        }
        else {
            window.alert('Odśwież stronę, wyłoniono juz zwycięzcę');
        }
    }

    render() {
        var status
        if (this.state.winner) {
            status = 'Player ' + this.state.winner + ' wins!!!!!!!';
        }
        else {
            status = 'Next player: ' + this.state.nextPlayer;
        }

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
                <button disabled={!this.state.winner} className="button" onClick={this.goingBackToPreviousMove}>Reverse move </button>
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
