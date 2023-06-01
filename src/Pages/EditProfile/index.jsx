
export default function EditProfilePage() {
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
                  <p>Edit Profile</p>
                  <p>Logout</p>
              </div>
          </aside>
  
          <div className="bucket-list">
              cards for bucket list
          </div>
      </div>
    )
  }
  