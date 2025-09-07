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
    clearToken();
    window.location.reload();
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
      <Sidebar onLogout={handleLogout} />
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
