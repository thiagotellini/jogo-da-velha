import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      player1: '',
      player2: '',
      draw: false,
      error: '',
    };
  }

  renderSquare(i) {
    return (
      <button className="square" onClick={() => this.handleClick(i)}>
        {this.renderSymbol(i)}
      </button>
    );
  }

  renderSymbol(i) {
    const symbol = this.state.squares[i];
    if (symbol === 'X') {
      return <span className="x">{symbol}</span>;
    } else if (symbol === 'O') {
      return <span className="o">{symbol}</span>;
    }
    return null;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i] || this.state.player1 === '' || this.state.player2 === '') {
      this.setState({ error: 'Insira os nomes para começar o jogo' });
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(
      {
        squares: squares,
        xIsNext: !this.state.xIsNext,
        error: '',
      },
      () => {
        const winner = calculateWinner(this.state.squares);
        if (winner) {
          this.setState({ draw: true });
        } else if (this.state.squares.every((square) => square !== null)) {
          this.setState({ draw: true });
        }
      }
    );
  }

  handlePlayerChange(event, playerNumber) {
    const playerName = event.target.value;
    this.setState({
      [playerNumber]: playerName,
    });
  }

  restartGame() {
    window.location.reload();
  }

  renderBoard() {
    const board = [];
    for (let i = 0; i < 9; i += 3) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const index = i + j;
        row.push(
          <div className="square" key={index} onClick={() => this.handleClick(index)}>
            {this.renderSymbol(index)}
          </div>
        );
      }
      board.push(<div className="row" key={i}>{row}</div>);
    }
    return board;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Vencedor: ' + (this.state.xIsNext ? this.state.player2 : this.state.player1);
    } else if (this.state.draw) {
      status = 'Empate';
    } else {
      status = 'Próximo jogador: ' + (this.state.xIsNext ? this.state.player1 : this.state.player2);
    }

    return (
      <div className="game-container">
        <h1 className="game-title">JOGO DA VELHA</h1>
        <div className="status">{status}</div>
        <div className="names">
          <input
            type="text"
            placeholder="Nome do Jogador 1"
            value={this.state.player1}
            onChange={(event) => this.handlePlayerChange(event, 'player1')}
            className="name-input"
          />
          <input
            type="text"
            placeholder="Nome do Jogador 2"
            value={this.state.player2}
            onChange={(event) => this.handlePlayerChange(event, 'player2')}
            className="name-input"
          />
        </div>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <div className="board">
          {this.renderBoard()}
        </div>
        <button className="restart-button" onClick={() => this.restartGame()}>
          Reiniciar Jogo
        </button>
        <footer className="footer">
          <p>&copy; Thiago Tellini - Todos os direitos reservados</p>
        </footer>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;