import React from 'react';
import { datePrettier } from '../utils/utils';
import Voter from './Voter'

const CommentCard = props => {
    
    const { author, votes, created_at, comment_id, body } = props.singleComment
    const { user } = props;
        return ( 
            <div>
                <span className="sub-heading-single-comment"><p className="posted-by-comment-author">Posted by {author}</p> <p className="posted-on-comment-date">{datePrettier(created_at)}</p></span>
                        <p className="comment-body">{body}</p>
    
                        {(user === "" ? <p>Only logged in users can vote and post comments</p> :
                            <Voter votes={votes} id={comment_id} type="comment"/>
                        )}
                        {(user.username === author ?
                            <button className="delete-button" onClick={() => props.deleteSingleComment(comment_id)}><span role="img" aria-label="cross">❌</span></button> : '')}
                            
            </div>
         );
    
}
 
export default CommentCard;