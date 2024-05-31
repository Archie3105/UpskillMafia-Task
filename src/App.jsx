import React, { useState, useEffect } from "react";
import "./App.css";

const UserProfile = () => {
  const [name, setName] = useState("Abhishek Kumar");
  const [bio, setBio] = useState("This is Abhishek Kumar  ");
  const [interests, setInterests] = useState("Watching movies & anime");
  const [profilePic, setProfilePic] = useState("https://scontent-del2-2.xx.fbcdn.net/v/t39.30808-6/444488648_3787138601608321_4209416447239844494_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RucxvpMej98Q7kNvgETfQy1&_nc_ht=scontent-del2-2.xx&oh=00_AYCPoZuHwFZrOuQbiE6JyNvhPUmpNTWobxk4aPwAdhssPg&oe=665F9AD7");
  const [editMode, setEditMode] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setName(storedProfile.name);
      setBio(storedProfile.bio);
      setInterests(storedProfile.interests);
      setProfilePic(storedProfile.profilePic);
    }
  }, []);

  const handleSave = () => {
    const profile = { name, bio, interests, profilePic };
    localStorage.setItem("profile", JSON.stringify(profile));
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <div className="editProfile">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setProfilePic(reader.result);
                }
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
          <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
            </div>
            <div>
            <label htmlFor="bio">Description</label>
          <textarea
            placeholder="Bio"
            value={bio}
            id="bio"
            onChange={(e) => setBio(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="interests">Interests</label>
          <input
            type="text"
            placeholder="Interests"
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          </div>
          
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="main-page">
        <div className="profileDetails">
          <img
            src={profilePic || "placeholder.jpg"}
            alt="Profile"
            className="profile-pic"
          />
          <div>
          <h2 style={{color:'tomato'}}>{name}</h2>
          <p>{bio}</p>
          <p>Interests: {interests}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        </div>
        <div className="no-posts">{showPosts ? "" : "No posts yet"}</div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;
