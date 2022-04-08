import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import profileImg from '../../assets/images/profileImg.jpeg';
import { Modal } from "bootstrap";
import axios from '../../config/axios'
import Spinner from "../utils/spinner";

function Header() {
  const [imgInput, setImgInput] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  //useRef is function that use for target show toggle
  const modalEl = useRef();
  const inputEl = useRef();

  const { logout, user, updateUser } = useContext(AuthContext); {/* use token to login */ }

  const handleClickProfile = () => { // show modal
    {/* bootstrap library*/ }
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj)
    modalObj.show();
  }

  const handleClickUpdate = async () => { // upload file and then hide modal
    try {
      setLoading(true) // when uploadind show spinner
      const formData = new FormData(); // when upload pic use FromData
      formData.append('profileImg', imgInput);

      const res = await axios.patch('/users/profile-img', formData);
      updateUser({ profileImg: res.data.profileImg });
      modal.hide();
      setLoading(false) // when upload success hide spinner

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
    {loading && <Spinner />}
      <nav className="navbar navbar-expand-sm sticky-top bg-white text-facebook">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i className="fab fa-facebook fs-1"></i>
          </Link>
          <div className="navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item mx-5">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home fs-2"></i>
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link to="/friend" className="nav-link">
                  <i className="fas fa-user-friends fs-2"></i>
                </Link>
              </li>
              <li className="nav-item mx-5">
                <div className="nav-link" role="button" onClick={() => logout()}>
                  <i className="fas fa-sign-out-alt fs-2"></i>
                </div>
              </li>
            </ul>
          </div>
          <div className="navbar-brand" role="button" onClick={handleClickProfile}>
            <img
              src={user.profileImg ?? profileImg}
              width="40"
              height="auto"
              className="rounded-circle"
              alt="user"
            />
          </div>
        </div>
      </nav>

      <div className="modal" ref={modalEl}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile Picture</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"  /* this command use to close modal on button */
                onClick={() => setImgInput(null)} //clear picture when close madal and open madal picture back to own user picture
              />
            </div>
            <div className="modal-body">
              <div className="mt-4 mb-5 d-flex justify-content-center">
                <input
                  type="file"
                  className="d-none"
                  ref={inputEl}
                  onChange={e => {   //when choose file this state will get file
                    if (e.target.files[0]) setImgInput(e.target.files[0]) // when choose and click again but cancel pic on madal will show lastest pic user choose
                  }}
                />
                <img
                  src={imgInput ? URL.createObjectURL(imgInput) : user.profileImg ?? profileImg} // show new image, own user image, default image
                  width="200"
                  height="auto"
                  className="rounded-circle"
                  alt="user"
                  role="button" //cursor pointer on picture object
                  onClick={() => inputEl.current.click()} //click to choose filr
                />
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!imgInput} // if not choose file can't  use this button
                  onClick={handleClickUpdate} // hide modal when click update button
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;