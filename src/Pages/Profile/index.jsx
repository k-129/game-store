import {Link, useParams} from 'react-router-dom';
import {useContext, useState, useNavigate} from 'react'; 
import { AuthContext } from '../../Context/auth.context';

export default function ProfilePage() {
    const { userId } = useParams();
    const {isLoggedIn, user, logoutUser} = useContext(AuthContext);

  return (
    <div className="profile">
        <aside className="profile-info">
            <img className="user-pic" src="" alt="profile-pic"/>
            <div className="user-info">
                <h3 className="user-name">User Name</h3>
                <p className="user-email">User email</p>
                <p className="about-me">About Me</p>
            </div>
            <div className="user-links">
                <Link to={`/profile/edit/${user._id}`}>Edit</Link>
                <button onClick={logoutUser}>Logout</button>
            </div>
        </aside>

        <div className="bucket-list">
            cards for bucket list
        </div>
    </div>
  )
}
