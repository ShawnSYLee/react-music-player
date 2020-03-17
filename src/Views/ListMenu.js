import React, { useState, useEffect } from 'react';
import { usePalette } from 'react-palette';
import { Link, useLocation } from 'react-router-dom';
import FilterResults from 'react-filter-search';

import Miniplayer from '../Components/Miniplayer';
import { PlaylistListItem, SongListItem } from '../Components/ListItem';

import useAudio from "../Hooks/useAudio";

import BackIcon from '../assets/icons/back.svg';

import '../App.css';

const ListMenu = () => {
    const {
        passID,
        changeTrack,
        activeSong,
        playlist,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        tracks,
        index,
        displaylist,
        displayinfo
    } = useAudio();
    const { data } = usePalette(activeSong.thumbs[0]);
    const [open, setOpen] = useState(false);
    const [displaySong, setDisplaySong] = useState(tracks[0]);
    const { pathname } = useLocation();

    useEffect(() => {
        passID(pathname.substring(1));
    }, [playlists]);

    function toggle(e) {
        setDisplaySong(e);
        setOpen(!open);
    }

    return (
        <>
            {/* HEADER NAVIGATION */}
            <div className="Header">
                <Link to="/">
                    <button className="btn-topicon">
                        <img src={BackIcon} className="icon" />
                    </button>
                </Link>
                <span className="txt-label">Playlist</span>
            </div>

            {/* BANNER MODAL */}
            <div className="droptest-banner"
                style={{
                    display: open ? 'block' : 'none',
                    animationDirection: open ? 'normal' : 'reverse'
                }}
            >
                <div className="drop-songinfo" >
                    <img src={displaySong.thumbs[1]} className="drop-songimage" />
                </div>
                <div className="drop-bannerbutton-container">
                    <button className="drop-button"
                        onClick={() => {
                            addToPlaylist("VOzWtitC47ReMccAjoh0", displaySong.id);
                            toggle(displaySong);
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
                            removeFromPlaylist(displayinfo.id, displaySong);
                            toggle(displaySong);
                        }}
                    >
                        Remove From Playlist
                    </button>
                </div>
            </div>
            
            {/* MODAL TOUCH BLOCKER */}
            <div className="TouchBlocker"
                style={{ display: open ? 'block' : 'none' }}
                onClick={() => toggle(displaySong)}
            />

            {/* PLAYLIST INFO BOX */}
            <div className="playlisttop-wrapper">
                <div className="playlistinfo-container">
                    <img src={displayinfo.thumbs[1]} alt="Playlist Cover" className="playlist-cover" />
                    <div className="playlist-info" >
                        <div className="txt-playlistinfo">By {displayinfo.author}</div>
                        <div className="txt-playlisttitle">{displayinfo.name}</div>
                        <div className="txt-playlistinfo">{displayinfo.tracks.length} Songs</div>
                    </div>
                </div>
                <div className="playlist-search-container" >
                    <div className="search-bar">Search</div>
                </div>
            </div>

            {/* PLAYLIST TRACK LIST */}
            <div className="track-list">
                {displaylist.map((track, i) =>
                    <SongListItem
                        key={track.id}
                        i={i}
                        track={track}
                        curtrack={activeSong}
                        data={data}
                        curPlaylist={playlist}
                        activePlaylist={displayinfo}
                        pathname={pathname}
                        changeTrack={changeTrack}
                        setOpen={setOpen}
                        toggle={toggle}
                    />
                )}
                <div style={{ marginBottom: index < 0 ? '2rem' : '8rem' }} />
            </div>

            {/* MINI PLAYER */}
            <Miniplayer />
        </>
    );
}

export default ListMenu;