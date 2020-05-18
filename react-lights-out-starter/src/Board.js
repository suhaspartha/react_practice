import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(let i=0; i< this.props.nrows; i++){
      let row = [];
      for(let j=0; j< this.props.ncols; j++){
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [i, j] = coord.split("-").map(Number);


    function flipCell(i, j) {
      // if this coord is actually on board, flip it

      if (j >= 0 && j < ncols && i >= 0 && i < nrows) {
        board[i][j] = !board[i][j];
      }
    }
    flipCell(i,j);
    flipCell(i-1,j);
    flipCell(i+1,j);
    flipCell(i,j-1);
    flipCell(i,j+1);
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if(this.state.hasWon){
      return (
        <div className="Board-title">
          <div className="neon-orange">You</div>
          <div className="neon-blue">win</div>
        </div>
      );
    }

    let tblBoard = [];
    for(let i=0; i<this.props.nrows; i++){
      let row = [];
      for(let j=0; j<this.props.ncols; j++){
        let coordinate = `${i}-${j}`;
        row.push(<Cell key={coordinate} isLit= {this.state.board[i][j]} flipCellsAroundMe = {() => this.flipCellsAround(coordinate)}/>);
      }
      tblBoard.push(<tr key={i}>{row}</tr>);
    }

    // TODO

    return(
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">out</div>
        </div>
        <table className = 'Board'>
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Board;
