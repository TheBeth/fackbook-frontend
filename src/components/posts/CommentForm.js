import { useContext, useEffect, useRef, useState } from "react";
import defaultImg from '../../assets/images/profileImg.jpeg'
import { AuthContext } from '../../contexts/AuthContext'


function CommentForm({ createComment }) { // get props createComment from PostFooter
    const [title, setTitle] = useState('');
    const inputEl = useRef();

    const { user } = useContext(AuthContext);

    useEffect(() => { // effect to focus on comment input when click show comment bar
        inputEl.current.focus();
    }, []);

    const handleSubmitForm = (e) => {
        e.preventDefault()
        createComment(title) // create new comment value with title key 
    };



    return (
        <form onSubmit={handleSubmitForm}>
            <div className="position-relative d-flex align-items-center">
                <img
                    src={user.profileImg ?? defaultImg}
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                    alt="user"
                />
                <input
                    type="text"
                    className="form-control rounded-pill d-inline"
                    placeholder="Write something ..."
                    ref={inputEl} // inputEl use useEffect function
                    value={title} // input comment by key title
                    onChange={e => setTitle(e.target.value)} // set comment {title : "....."}
                />
            </div>
        </form>
    )
}

export default CommentForm;