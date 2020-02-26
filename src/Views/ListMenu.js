import React, { useState, useEffect } from 'react';
import '../App.css';

import BackIcon from '../assets/icons/back.svg';

import { FiChevronLeft } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link, useLocation, useHistory } from 'react-router-dom';

import FilterResults from 'react-filter-search';
import Miniplayer from '../Components/Miniplayer';
import useAudio from "../Hooks/useAudio";

const ListMenu = () => {
    const {
        changeTrack,
        activeSong,
        playlist,
        playlists,
        playlistInfo,
        tracks,
        index
    } = useAudio();
    const { data } = usePalette(playlistInfo.cover);

    const { pathname } = useLocation();
    const [activePlaylist] = useState(playlists[pathname.substring(1, pathname.length)]);

    return (
        <>
            <div className="Header">
                <Link to="/">
                    <button className="btn-topicon">
                        <img src={BackIcon} className="icon" />
                    </button>
                </Link>
                <span className="txt-label">Playlist</span>
            </div>
            <div className="playlisttop-wrapper">
                <div className="playlistinfo-container">
                    <img src={activePlaylist.info.cover} alt="Playlist Cover" className="playlist-cover" />
                    <div className="playlist-info" >
                        <div className="txt-playlistinfo">By {activePlaylist.info.author}</div>
                        <div className="txt-playlisttitle">{activePlaylist.info.name}</div>
                        <div className="txt-playlistinfo">{activePlaylist.tracks.length} Songs</div>
                    </div>
                </div>
                <div className="playlist-search-container" >
                    <div className="search-bar">Search</div>
                </div>
            </div>
            <div className="track-list">
                {activePlaylist.tracks.map((track, i) =>
                    <Track key={track.id} i={i} track={track} curtrack={activeSong} data={data} activePlaylist={activePlaylist} changeTrack={changeTrack} />
                )}
                <div style={{ marginBottom: index < 0 ? '2rem' : '8rem' }} >
                </div>
            </div>
            <Miniplayer />
        </>
    );
}

const Track = ({ i, track, curtrack, data, activePlaylist, changeTrack }) => {
    return (
        <div>
            <button className="track-container" 
                onClick={() => {
                    changeTrack(activePlaylist.info.id, i);
                }}
            >
                <div className="txt-tracktitle" style={track.title == curtrack.title ? { color: data.vibrant } : {}}>{track.title}</div>
                <div className="txt-trackinfo">{track.artist.join(', ')} | {track.album}</div>
            </button>
        </div>
    );
}

export default ListMenu;