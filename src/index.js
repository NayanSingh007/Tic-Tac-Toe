import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Game extends React.Component {

    state = {
        menu: true,
        gameOn: true,
        gameOvT: false,
        nxtPlayer: false,
        moves: Array(9).fill(null)
        //moves: ['X','O','O','O','X','X','O','O','X']
    }

    handleO = () => {
        //console.log("nxt player O");
        this.setState({
            nxtPlayer: false,
            menu: false
        })
    }

    handleX = () => {
        //console.log("nxt player X");
        this.setState({
            nxtPlayer: true,
            menu: false
        })
    }

    handleClick = (e) => {
        if (this.state.gameOn){
            const moves = this.state.moves.slice();
            if (!e.target.innerText){
                moves[e.target.getAttribute('name')] = this.state.nxtPlayer ? 'X' : 'O';
                this.setState({
                    moves: moves,
                    nxtPlayer: !(this.state.nxtPlayer),
                })
            }
            const w = winCheck(moves);
            //console.log("W = " + w);
            if (w){
                this.setState({
                    gameOn: false,
                    nxtPlayer: !(this.state.nxtPlayer)
                })
            }
        }else{
            console.log("Game Over!");
        }
    } 

    handleNG = () => {
        this.setState({
            menu: true,
            gameOn: true,
            gameOvT: false,
            nxtPlayer: false,
            moves: Array(9).fill(null)
        })
    }

    render(){

        if (this.state.menu){
            return (
                <div className='menu'>
                    <h1>Tic</h1>
                    <h1>Tac</h1>
                    <h1>Toe</h1>
                    <h2>Start with</h2>
                    <div className='start'>
                        <div className="butX" onClick={this.handleX}>
                            X
                        </div> 
                        <div className="butO" onClick={this.handleO}>
                            O
                        </div> 
                    </div>
                </div>  
            )
        }else {
            return(
                <div>
                    <Grid nxtPlayer={this.state.nxtPlayer} gameOn={this.state.gameOn} moves={this.state.moves} handleClick={this.handleClick} handleNG={this.handleNG}/>
                </div>
            );
        };
    }
}

class Square extends React.Component {
    render() {
        return (
            <div className='sq' name={this.props.name} onClick={this.props.clickfunc}>
                {this.props.value}
            </div>
        );
    }
}

class Grid extends React.Component {

    render(){
        let player = this.props.nxtPlayer ? 'X': 'O';
        let gameOn = this.props.gameOn ? 'Next Player' : 'Loser';
        return(
            <div className='grid'>
                    <h1>{gameOn} : {player}</h1>
                    <SqRow i={0} val={this.props.moves} handleClick={this.props.handleClick}/>
                    <SqRow i={3} val={this.props.moves} handleClick={this.props.handleClick}/>
                    <SqRow i={6} val={this.props.moves} handleClick={this.props.handleClick}/>
                    <div className='newG' onClick={this.props.handleNG}>
                        New Game
                    </div>
            </div>
        );
    }
}

class SqRow extends React.Component{
    render(){
        return(
            <div className='row'>
                <Square key={this.props.i} name={this.props.i} value={this.props.val[this.props.i]} clickfunc={this.props.handleClick} />
                <Square key={this.props.i+1} name={this.props.i+1} value={this.props.val[this.props.i+1]} clickfunc={this.props.handleClick} />
                <Square key={this.props.i+2} name={this.props.i+2} value={this.props.val[this.props.i+2]} clickfunc={this.props.handleClick} />
            </div>
        )
    }
}

function winCheck(arr){
    const data=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [6,4,2],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
        
    for(let i=0;i<data.length;i++){
        const [a,b,c] = data[i];
        if(arr[a] && arr[b] === arr[a] && arr[c] === arr[a]){
            return arr[a];
        }
    }

    if(!arr.includes(null)){
        return "GO";
    }

    return null;
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);