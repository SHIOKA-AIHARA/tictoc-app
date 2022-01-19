import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
    return (
        <button className="square" 
        onClick={props.onClick} > 
        {props.value}
            </button>
    );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      //Array()は、1~9の数字があるという意味を表すのではなく、9個の配列がある、という意味を表す
      xIsNext: true,
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares)|| squares[i]){
      return;
  }

  squares[i] = this.state.xIsNext ? 'X' : '0';
  //クリックというアクションがされたときに、何かしらのsquaresを`X`に変更します、という宣言
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
    //クリックをしたときに、xIsNextという変数が反転されるようにセットする。
  });
  //新しくsquaresをセットしてstateします、という宣言。このときの変数名（squares）は同じでもいいし、変更しても良い
}
    //render以外のhandleclickやrenderSquareなどは、どんな名前でも良い。ただの機能名。
    //機能や変数の名前を定義して、renderの中で操作をして画面に表示させる
        //squaresの値をコピーする→コピーをしないと、イミュータビリティ（最初に宣言された値を取っておく）ができないから。
        //最初に宣言した値を取っておきながら、値を変更する際に使用する
    

  renderSquare(i) {
    return (
    <Square
     value={this.state.squares[i]} 
    onClick = {()=>this.handleClick(i)}
    />
    );
  }
    render (){

      console.log(this.props.color)
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
        status = 'Winner: '+ winner;
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
      }

//重複するはずのコードを避けるためにrenderSquareという変数を先に定義している
      return(
      <div>
        <div className="status" style={{color: "yellow"}}>{status}</div>
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

class Game extends React.Component{

  render(){
    const color = "blue"
    const size = "L"
    console.log("game ")
return(
      <div className="game">
        <div className="game-board">
          <Board color={color} size={size} material="wood"/>
          <Board color="pink" size={size} material="wood"/>
        </div>
        <div className="game-info">
          <div>{/*STATUS*/}</div>
          <ol>{/* TODO */}</ol>
        </div>
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
// ======================================== 

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

