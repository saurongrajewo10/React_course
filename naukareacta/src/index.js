import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    state = {
        character: null
    };

    alertMethod() {
        alert('kliknięto w przycisk');
    }

    setCharacterState() {
        if(!this.state.character){
            this.setState({ character: this.props.nextCharacter });
            this.props.setNextCharacter(this.props.nextCharacter);    
        }
    };

    render() {
        return (
            <button
                className="square"
                onClick={() => this.setCharacterState()}>
                {this.state.character}
            </button>
        );
    }
}

class Board extends React.Component {
    state = {
        squares: Array(9).fill(null),
        nextCharacter: 'X'
    };

    setNextCharacterHandler = (previousCharacter) => {        
        this.setState( {nextCharacter : previousCharacter === 'X' ? 'O' : 'X'});
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}  
                       nextCharacter={this.state.nextCharacter} 
                       setNextCharacter={this.setNextCharacterHandler}
        />;
    }

    render() {
        const status = 'Next player: ';

        return (
            <div>
                <div className="status">{status}{this.state.nextCharacter}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
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
