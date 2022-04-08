import PostCard from "./PostCard";

function PostList({posts}) { // recieve props(posts) from PostWrapper
    return (
        <>
            {posts.map(item => (
                <PostCard key={item.id} post={item} /> // sent props(post) to PostCard
            ))}
        </>
    );
}

export default PostList;
