import PostAction from '../posts/PostAction';
import CommentList from '../posts/CommentList';
import CommentForm from '../posts/CommentForm';
import { useState } from 'react';
import axios from "../../config/axios";

function PostFooter({ post: { Comments, id } }) { //get props(post) obj use key in obj
    const [comments, setComments] = useState(Comments); // use to send number of comment to PostAction
    const [showComment, setShowComment] = useState(false); // use to shom comment when click number of comment toggle
    const [showForm, setShowForm] = useState(false); // use to show comment box toggle

    const toggleShowComment = () => { // function click to show or hide comment
        setShowComment(prev => !prev); 
    };

    const toggleShowForm = () => { // function click to show or hide comment form
        setShowForm(prev => !prev)
    };

    const createComment = async (title) => { // create comment to backend and keep in database
        try{
            const res = await axios.post('/comments', {title, postId : id}); // set new comment in obj {title : '..new comment..', postId : ..(id post that have new comment)..}
            console.log(res.data)
            setComments( prev => [...prev, res.data.comment])
            setShowComment(true)
            toggleShowForm(false); // when send new comment will auto close comment form
        }catch(err) {}
    }

    return (
        <div className="p-2">
            <PostAction
                numComment={comments.length} // send number of comment
                toggleShowComment={toggleShowComment} // send command to show or hine commetn list
                toggleShowForm={toggleShowForm} // send command to show or hide comment box 
            /> 
            {showComment && <CommentList comments={comments} />} {/* send state name comments(outer{}) to comment list  */}
            {showForm && <CommentForm createComment={createComment} />} {/* send createComment command to CommentForm*/}
        </div>
    )
}

export default PostFooter;