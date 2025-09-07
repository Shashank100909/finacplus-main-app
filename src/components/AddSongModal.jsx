import React, { useState } from "react";
import "../styles/AddSongModal.css";
import Swal from "sweetalert2";

export default function AddSongModal({ onClose, onSubmit, existingSongs }) {
  const [song, setSong] = useState({
    title: "",
    album: "",
    artist: "",
    cover: "",
  });

 
  const [errors, setErrors] = useState({ title: "", artist: "" });

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });

  
    if (e.target.name === "title" && errors.title) {
      setErrors(prev => ({ ...prev, title: "" }));
    }
    if (e.target.name === "artist" && errors.artist) {
      setErrors(prev => ({ ...prev, artist: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSong({ ...song, cover: previewUrl });
    }
  };

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { title: "", artist: "" };

    
    if (!song.title.trim()) {
      newErrors.title = "Title is required";
      hasError = true;
    }
    if (!song.artist.trim()) {
      newErrors.artist = "Artist is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    
    const exists = (existingSongs || []).some(
      s =>
        s.title.toLowerCase() === song.title.toLowerCase() &&
        s.artist.toLowerCase() === song.artist.toLowerCase()
    );

    if (exists) {
      Swal.fire("Error", "This song already exists!", "error");
      return;
    }

    onSubmit(song); 
    Swal.fire("Success", "Song added successfully!", "success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Add New Song</h3>

        <input
          name="title"
          placeholder="Song Title"
          className="modal-input"
          onChange={handleChange}
          value={song.title}
          style={{ borderColor: errors.title ? "red" : "#ccc" }}
        />
        {errors.title && (
          <div style={{ color: "red", fontSize: "12px", marginBottom: "6px" }}>
            {errors.title}
          </div>
        )}

        <input
          name="album"
          placeholder="Album"
          className="modal-input"
          onChange={handleChange}
          value={song.album}
        />

        <input
          name="artist"
          placeholder="Artist"
          className="modal-input"
          onChange={handleChange}
          value={song.artist}
          style={{ borderColor: errors.artist ? "red" : "#ccc" }}
        />
        {errors.artist && (
          <div style={{ color: "red", fontSize: "12px", marginBottom: "6px" }}>
            {errors.artist}
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {song.cover && (
          <div style={{ textAlign: "center", margin: "12px 0" }}>
            <img
              src={song.cover}
              alt="preview"
              style={{ width: "120px", height: "120px", borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-add" onClick={handleSubmit}>
            Add
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
