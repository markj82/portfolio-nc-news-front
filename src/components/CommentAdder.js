import React from 'react';
import { postComment } from '../api';

class CommentAdder extends React.Component {
    state = { 
        body: ''
    }

    handleChange = e => {
        const { value } = e.target;
        this.setState({
            body: value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { body } = this.state;
        const { user, id } = this.props;
        if (body === "") return alert('This field cannot be empty!')
        postComment(id, {body, username: user.username})
            .then(res => {
                console.log(res, '<<< comment from comment adder')
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
                    Comment:
                    <input type="text" name="body" id="body" value={body} onChange={this.handleChange}/>
                    <button>Add a comment</button>
                </label>
            </form>
         );
    }

    
}
 
export default CommentAdder;