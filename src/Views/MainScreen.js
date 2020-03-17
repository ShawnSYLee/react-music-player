import React, { useState, useRef, useContext } from 'react';
import { usePalette } from 'react-palette';

import { MusicContext } from '../Contexts/MusicContext';

import Miniplayer from '../Components/Miniplayer';
import { PlaylistListItem, AddPlaylistListItem } from '../Components/ListItem';

import useAudio from "../Hooks/useAudio";
import { useCloud } from "../Hooks/useCloud";

import '../Styles/App.css';

const MainScreen = () => {
    const [state] = useContext(MusicContext);
    useAudio();
    const { data } = usePalette(state.playlist.thumbs[0]);
    const [mode, setMode] = useState("playlists");

    return (
        <>
            {/* HEADER LABEL */}
            <div className="MainScreenHeader">
                <span className="txt-biglabel">Music</span>
            </div>

            {/* TAB NAVIGATION & SEARCH BAR */}
            <div className="mainscreen-tabs">
                <span className="txt-label"
                    onClick={() => setMode("playlists")}
                    style={{ color: mode === "playlists" ? 'rgb(80, 80, 80)' : 'rgb(200, 200, 200)' }}
                >
                    Playlists
                </span>
                <span className="txt-label"
                    onClick={() => setMode("songs")}
                    style={{
                        paddingLeft: '8px',
                        color: mode === "songs" ? 'rgb(80, 80, 80)' : 'rgb(200, 200, 200)'
                    }}
                >
                    Songs
                </span>
            </div>
            <div className="playlist-search-container" >
                <div className="search-bar">Search</div>
            </div>

            {/* PLAYLIST LIST */}
            <div className="playlist-list"
                style={{ display: mode === "playlists" ? 'block' : 'none' }}
            >
                <AddPlaylistListItem />
                {Object.keys(state.playlists).map((pl, i) =>
                    <PlaylistListItem
                        key={pl}
                        i={i}
                        id={Object.keys(state.playlists)[i]}
                        playlist={state.playlists[pl]}
                        data={data}
                    />
                )}
                <div style={{ marginBottom: state.index < 0 ? '2rem' : '8rem' }} />
            </div>

            {/* UPLOAD FORM */}
            <div className="track-list"
                style={{ display: mode === "songs" ? 'block' : 'none' }}
            >
                <UploadForm />
            </div>

            {/* MINI PLAYER */}
            <Miniplayer />
        </>
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