import React from 'react';
import {addVote} from '../api';
import '../styles/Voter.css'


class Voter extends React.Component {
    state = {
        voteMod: 0,
        err: null
    }

    render() {
        return(
            <div className="voter">
                <button
                    className="voter-button"
                    onClick={()=> this.voteAdder(1)} 
                    disabled={this.state.voteMod === 1}><span role="img" aria-label="thumbup">👍</span></button>
                
                
                <h3 className="votes-number">Votes: {this.props.votes + this.state.voteMod}</h3>
                
                <button
                    onClick={()=> this.voteAdder(-1)} 
                    disabled={this.state.voteMod === -1} ><span role="img" aria-label="thumbdown">👎</span></button>
            </div>
        )
    }

    voteAdder = num => {
        addVote(this.props.type, this.props.id, num)
            .catch(err => {
            this.setState(err)
            })
            this.setState(state => {
                return {voteMod: state.voteMod + num}
            })
        }
}

export default Voter
