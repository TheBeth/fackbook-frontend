import { useEffect, useState } from "react";
import axios from '../../config/axios'
import Spinner from "../utils/spinner";
import PostForm from "./PostForm"
import PostList from "./PostList";

function PostWrapper() {
    const [posts, setPost] = useState([]); // use to set state for get all post from backend 
    const [loading, setLoading] = useState(false); // set state loading when waiting upload post or img


    const fetchPost = async () => {
        try {
            const res = await axios.get('/posts') // connect with backend
            setPost(res.data.posts); // posts is key in obj sent with json via backend find in postController getAllPosts
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchPost();
    }, [])

    const createPost = async (title, img) => {  
        const formData = new FormData()
        formData.append('title', title) // get title from front to post on model post
        formData.append('img', img) // get img from front to post on model post

        try {
            setLoading(true)
            await axios.post('/posts', formData);
            fetchPost();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <PostForm createPost={createPost}/> {/* send props name createPost to PostForm */}
            <PostList posts={posts} /> {/*sent props(in case key is postsin {}) to PostList file}*/}
        </>
    );
}

export default PostWrapper;