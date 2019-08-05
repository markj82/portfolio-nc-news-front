import React from 'react';
import { postComment } from '../api';
import '../styles/CommentAdder.css'

class CommentAdder extends React.Component {
    state = { 
        body: '',
        warningField: 'This field cannot be empty!',
        infoField: '',
        addedComment: '',
        showField: false
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
        } else {
            postComment(id, {body, username: user.username})
                .then(res => {
                    this.props.addComment(res)
                })
            this.setState({
                body: '',
                infoField: "Thanks for your comment!"
            })
        }
    }

    render() { 
        const { body } = this.state;
        return ( 
            <form onSubmit={this.handleSubmit} className="add-form-comment">
                <label htmlFor="body">
                    Share your thoughts:
                    <textarea className="text-area-comment" type="text" name="body" id="body" placeholder="Post your comment here.." value={body} onChange={this.handleChange}/>
                    <h5>{this.state.infoField}</h5>
                    <button disabled={this.state.isDisabled} className="add-comment-button">Add a comment</button>
                    {this.state.showField && <h4 className="empty-field">{this.state.warningField}</h4>}
                </label>
            </form>
         );
    }

    
}
 
export default CommentAdder;