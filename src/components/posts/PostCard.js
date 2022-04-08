import PostHeader from '../posts/PostHeader';
import PostContent from '../posts/PostContent';
import PostFooter from '../posts/PostFooter'


function PostCard({ post }) { // recieve props(post) from PostList
    return (
        <div className="card mt-4">
            <PostHeader post={post}/>
            <PostContent post={post} /> {/* sent props(post) to PostContent ( post(1)={post(2)} )  (1) is obj sent to PostContent, (2) is props recieve from PostCard */}
            <PostFooter post={post}/>
        </div>
    )
}

export default PostCard;