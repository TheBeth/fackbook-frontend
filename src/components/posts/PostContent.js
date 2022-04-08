function PostContent({ post: { title, img } }) { // get props post from PostCard which post is obj and title, img is key
    return (
        <>
            {title && <p className="text-justify px-3 py-1">{title}</p>} {/* check have title or null */}
            {img && <img src={img} className="img-fluid" alt="post-img" />} {/* check have image or null */}
        </>
    )
}

export default PostContent;