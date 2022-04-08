import CommentItem from "./CommentItem";

function CommentList({ comments }) { // get props comment from CommentFooter
    return (
        <div className="pt-1">
            {comments.map(item => (
                <CommentItem
                    key={item.id} // add key id when have new comment
                    comment={item} // send item to CommentItem with name comment
                />
            ))}
        </div>
    )
}

export default CommentList;