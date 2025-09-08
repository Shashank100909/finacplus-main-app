import React, { useState, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AddSongModal from "./components/AddSongModal";
import LoginPage from "./LoginPage";
import {
  saveToken,
  generateMockToken,
  clearToken,
  getToken,
  parseToken,
  isTokenValid,
} from "./auth";
import "./styles/App.css";
import Swal from "sweetalert2";

const MusicLibrary = React.lazy(() => import("music_library/LibraryApp"));

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [songs, setSongs] = useState([]);

  const token = getToken();
  const isLoggedIn = isTokenValid(token);
  const role = isLoggedIn ? parseToken(token)?.role : null;

  const handleLogin = ({ role }) => {
    const token = generateMockToken(role);
    saveToken(token);
    window.location.reload();
  };

const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      clearToken();         // clear the auth token
      window.location.reload(); // reload the page
      Swal.fire('Logged Out!', 'You have been logged out.', 'success');
    }
  });
};
  const handleAddSong = () => setShowModal(true);

const handleSubmitSong = (song) => {
  setSongs([...songs, song]); 
};


  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar className="Side-bar" onLogout={handleLogout} />
      <div className="main-content">
        <Topbar />
      {showModal && (
  <AddSongModal
    existingSongs={songs}                 
    onClose={() => setShowModal(false)}
    onSubmit={handleSubmitSong}
  />
)}
        <Suspense fallback={<div className="loading">Loading Library...</div>}>
          <MusicLibrary newSongs={songs} role={role} onAddSong={handleAddSong} />
        </Suspense>
      </div>
    </div>
  );
}

