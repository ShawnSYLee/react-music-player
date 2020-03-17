import React, { useState, useEffect, useContext } from 'react';
import { usePalette } from 'react-palette';
import { Link, useLocation } from 'react-router-dom';
// import FilterResults from 'react-filter-search';

import { MusicContext } from '../Contexts/MusicContext';
import { DisplayContext } from '../Contexts/DisplayContext';

import Miniplayer from '../Components/Miniplayer';
import { PlaylistListItem, SongListItem } from '../Components/ListItem';
import { PlaylistPicker } from '../Components/PlaylistPicker';

import useAudio from "../Hooks/useAudio";
import useDisplay from "../Hooks/useDisplay";

import BackIcon from '../assets/icons/back.svg';

import '../Styles/App.css';

const ListMenu = () => {
    const [state] = useContext(MusicContext);
    const [display] = useContext(DisplayContext);
    const {
        passID,
        changeTrack,
        addToPlaylist,
        removeFromPlaylist,
    } = useAudio();
    const {
        openModal,
        closeModal,
        openPlaylistPicker,
        closePlaylistPicker,
        setDisplaySong
    } = useDisplay();

    const { data } = usePalette(state.activeSong.thumbs[0]);

    // const [open, setOpen] = useState(false);
    // const [playlistpickeropen, setPlaylistpickeropen] = useState(false);

    // const [displaySong, setDisplaySong] = useState(state.tracks[0]);
    const { pathname } = useLocation();

    useEffect(() => {
        passID(pathname.substring(1));
    }, [state.playlists]);

    // function toggle(e) {
    //     setDisplaySong(e);
    //     setOpen(!open);
    // }

    return (
        <>
            <PlaylistPicker />

            {/* BANNER MODAL */}
            <div className="droptest-banner"
                style={{
                    display: display.inModal ? 'block' : 'none',
                    animationDirection: display.inModal ? 'normal' : 'reverse'
                }}
            >
                <div className="drop-songinfo" >
                    <img className="drop-songimage"
                        src={display.displaySong.thumbs[1]} 
                        alt="album art"
                    />
                </div>
                <div className="drop-bannerbutton-container">
                    <button className="drop-button"
                        onClick={() => {
                            openPlaylistPicker();
                        }}
                    >
                        Add to Playlist
                    </button>
                    <button className="drop-button">Add to Queue</button>
                    <button className="drop-button">View Album</button>
                    <button className="drop-button">View Artist</button>
                    <button className="drop-button">Share</button>
                    <button className="drop-button"
                        onClick={() => {
                            removeFromPlaylist(state.displayinfo.id, display.displaySong);
                            closeModal();
                        }}
                    >
                        Remove From Playlist
                    </button>
                </div>
            </div>

            {/* MODAL TOUCH BLOCKER */}
            <div className="TouchBlocker"
                style={{ display: display.inModal ? 'block' : 'none' }}
                onClick={() => closeModal()}
            />

            {/* HEADER NAVIGATION */}
            <div className="Header">
                <Link to="/">
                    <button className="btn-topicon">
                        <img className="icon"
                            src={BackIcon}
                            alt="back button"
                        />
                    </button>
                </Link>
                <span className="txt-label">Playlist</span>
            </div>

            {/* PLAYLIST INFO BOX */}
            <div className="playlisttop-wrapper">
                <div className="playlistinfo-container">
                    <img src={state.displayinfo.thumbs[1]} alt="Playlist Cover" className="playlist-cover" />
                    <div className="playlist-info" >
                        <div className="txt-playlistinfo">By {state.displayinfo.author}</div>
                        <div className="txt-playlisttitle">{state.displayinfo.name}</div>
                        <div className="txt-playlistinfo">{state.displayinfo.tracks.length} Songs</div>
                    </div>
                </div>
                <div className="playlist-search-container" >
                    <div className="search-bar">Search</div>
                </div>
            </div>

            {/* PLAYLIST TRACK LIST */}
            <div className="track-list">
                {state.displaylist.map((track, i) =>
                    <SongListItem
                        key={track.id}
                        i={i}
                        track={track}
                        data={data}
                        pathname={pathname}
                    />
                )}
                <div style={{ marginBottom: state.index < 0 ? '2rem' : '8rem' }} />
            </div>

            {/* MINI PLAYER */}
            <Miniplayer />
        </>
    );
}

export default ListMenu;