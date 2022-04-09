import { useEffect, useState } from 'react';
import FriendList from './FriendList';
import FriendMenu from './FriendMenu'
import { ALL_FRIEND, REQUEST_FRIEND } from '../../config/data'
import axios from '../../config/axios';

function FriendWrapper() {
    const [mode, setMode] = useState(ALL_FRIEND);
    const [friends, setFriends] = useState([]); // get state all friend that status ACCEPTED keep in array
    const [toggleFetch, setToggleFetch] = useState(false);

    useEffect(() => {
        const fetchFriend = async () => { // wrapper function cuz useEffect can't use async/await directly
            let res;
            if (mode === ALL_FRIEND) {
                res = await axios.get('/friends?status=ACCEPTED') // get user who have status ACEPTED
            } else if (mode === REQUEST_FRIEND) {
                res = await axios.get('/friends?status=REQUESTED') // get user who you  REQUESTED 
            } else {
                res = await axios.get('friends/unknown')
            }
            setFriends(res.data.users); // .users cuz send response.json(users)  {find in friendController => getAllFriend}
        };
        fetchFriend();
    }, [mode, toggleFetch]) // when mode change state will change too

    const requestFriend = async (requestToId) => { // use  in find friend menu for request friend 
        await axios.post('/friends', { requestToId })
        setToggleFetch(prev => !prev) // use for update state
    };

    const acceptFriend = async friendId => {  // send update status to ACCEPTED
        await axios.patch('/friends/' + friendId)
        setToggleFetch(prev => !prev)
    }

    const changeMode = value => {
        setMode(value);
    }

    const deleteFriend = async friendId => {
        await axios.delete('/friends/' + friendId)
        setToggleFetch(prev => !prev)
    }

    return (
        <>
            <FriendMenu changeMode={changeMode} /> {/* send props changeMode to FriendMenu to choise mode friend friendRequest findFriend */}
            <input
                className="form-control rounded-pill"
                type="search"
                placeholder="Search"
            />
            <FriendList
                friends={friends}
                mode={mode}
                requestFriend={requestFriend}
                acceptFriend={acceptFriend}
                deleteFriend={deleteFriend}
            /> {/* send props friends from backend to FriendList   And  send props mode to change type of button when accepted requested or add friend */}
        </>
    )
}

export default FriendWrapper;