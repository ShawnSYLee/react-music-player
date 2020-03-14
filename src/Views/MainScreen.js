import React, { useState, useRef } from 'react';
import '../App.css';

import BackIcon from '../assets/icons/back.svg';

import { usePalette } from 'react-palette';
import { Link, useHistory } from 'react-router-dom';

import Miniplayer from '../Components/Miniplayer';
import useAudio from "../Hooks/useAudio";
import { useCloud } from "../Hooks/useCloud";

const MainScreen = () => {
  const {
    playlist,
    playlists,
    index
  } = useAudio();
  const { data } = usePalette(playlist.cover);
  const [mode, setMode] = useState("playlists");

  return (
    <>
      <div className="MainScreenHeader">
        <span className="txt-biglabel">Music</span>
      </div>
      <div className="mainscreen-tabs">
        <span className="txt-label" onClick={() => setMode("playlists")} style={{ color: mode === "playlists" ? 'rgb(80, 80, 80)' : 'rgb(200, 200, 200)' }}>Playlists </span>
        <span className="txt-label" onClick={() => setMode("songs")} style={{ paddingLeft: '8px', color: mode === "songs" ? 'rgb(80, 80, 80)' : 'rgb(200, 200, 200)' }}>Songs </span>
      </div>
      <div className="playlist-search-container" >
        <div className="search-bar">Search</div>
      </div>
      <div className="playlist-list" style={{ display: mode === "playlists" ? 'block' : 'none' }}>
        {Object.keys(playlists).map((pl, i) =>
          <Playlist key={pl} i={i} id={Object.keys(playlists)[i]} playlist={playlists[pl]} curplaylist={playlist} data={data} />
        )}
        <div style={{ marginBottom: index < 0 ? '2rem' : '8rem' }} >
        </div>
      </div>
      <div className="track-list" style={{ display: mode === "songs" ? 'block' : 'none' }}>
        <UploadForm />
      </div>
      <Miniplayer />
    </>
  );
}

const Playlist = ({ i, id, playlist, curplaylist, data, func }) => {
  let history = useHistory();
  return (
    <div>
      <button
        onClick={() => {history.push('/' + id)}}
        className="playlistlist-container"
        style={playlist.name === curplaylist.name ? { color: data.vibrant } : {}}
      >
        <img src={playlist.cover} className="img-playlistlistcover" />
        <div className="playlistlist-textcontainer" >
          <div className="txt-tracktitle">{playlist.name}</div>
          <div className="txt-trackinfo">By {playlist.author}</div>
        </div>
      </button>
    </div>
  );
}

const UploadForm = () => {

  const inputFile = useRef(null);

  const {
    handleUpload,
    audioFile, setAudioFile,
    artFile, setArtFile,
    title, setTitle,
    artist, setArtist,
    album, setAlbum
  } = useCloud();
  return (
    <>
      <div>
        <label>Audio File</label>
        <input type="file" onChange={(e) => setAudioFile(e)} ref={inputFile} accept="audio/mp3, audio/wav" />
      </div>
      <div>
        <label>Album Art</label>
        <input type="file" onChange={(e) => setArtFile(e)} accept="image/png, image/jpeg" />
      </div>
      <div>
        <label>Title</label>
        <input type="text" onChange={(e) => setTitle(e)} />
      </div>
      <div>
        <label>Artist</label>
        <input type="text" onChange={(e) => setArtist(e)} />
      </div>
      <div>
        <label>Album</label>
        <input type="text" onChange={(e) => setAlbum(e)} />
      </div>
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default MainScreen;