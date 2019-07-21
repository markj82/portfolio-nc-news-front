import React from 'react';
import { postComment } from '../api';
import '../styles/CommentAdder.css'

class CommentAdder extends React.Component {
    state = { 
        body: '',
        emptyField: 'This field cannot be empty!',
        showField: false,
        isEnabled: false
    }

    handleChange = e => {
        const { value } = e.target;
        this.setState({
            body: value,
            showField: false,
            isDisabled: false
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { body } = this.state;
        const { user, id } = this.props;

        if (body === "") {
            this.setState({
                showField: true,
                isDisabled: true
            })
            return;
        }
       
        postComment(id, {body, username: user.username})
            .then(res => {
                console.log(res, '<<< comment from comment adder')
                this.props.addComment(res)
            })
        this.setState({
            body: ''
        })
    }

    render() { 
        const { body } = this.state;
        return ( 
            <form onSubmit={this.handleSubmit} className="add-form-comment">
                <label htmlFor="body">
                    Share your thoughts:
                    <textarea className="text-area-comment" type="text" name="body" id="body" placeholder="Post your comment here.." value={body} onChange={this.handleChange}/>
                    <button disabled={this.state.isDisabled} className="add-comment-button">Add a comment</button>
                    {this.state.showField && <h4 className="empty-field">{this.state.emptyField}</h4>}
                </label>
            </form>
         );
    }

    
}
 
export default CommentAdder;