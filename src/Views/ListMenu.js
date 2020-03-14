import React, { useState, useEffect } from 'react';
import '../App.css';

import BackIcon from '../assets/icons/back.svg';

import { FiChevronLeft } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link, useLocation, useHistory } from 'react-router-dom';

import FilterResults from 'react-filter-search';
import Miniplayer from '../Components/Miniplayer';
import useAudio from "../Hooks/useAudio";
import { useCloud } from "../Hooks/useCloud";

const ListMenu = () => {
    const {
        passID,
        changeTrack,
        activeSong,
        playlist,
        playlists,
        playlistplaceholder,
        tracks,
        index,
        displaylist,
        displayinfo
    } = useAudio();
    const { data } = usePalette(playlist.cover);

    const { pathname } = useLocation();
    useEffect(() => {
        console.log("ID", pathname);
    });

    useEffect(() => {
        passID(pathname.substring(1));
    }, [playlists]);

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
                    <img src={displayinfo.cover} alt="Playlist Cover" className="playlist-cover" />
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
            <div className="track-list">
                {displaylist.map((track, i) =>
                    <Song key={track.id} i={i} track={track} curtrack={activeSong} data={data} curPlaylist={playlist} activePlaylist={displayinfo} pathname={pathname} changeTrack={changeTrack} />
                )}
                <div style={{ marginBottom: index < 0 ? '2rem' : '8rem' }} >
                </div>
            </div>
            <Miniplayer />
        </>
    );
}

const Song = ({ i, track, curtrack, data, curPlaylist, activePlaylist, pathname, changeTrack }) => {
    return (
        <div>
            <button className="track-container" 
                onClick={() => {
                    changeTrack(pathname.substring(1), i);
                }}
            >
                <div className="txt-tracktitle" style={track.title == curtrack.title && curPlaylist.id == activePlaylist.id ? { color: data.vibrant } : {}}>{track.title}</div>
                <div className="txt-trackinfo">{track.artist.join(', ')} | {track.album}</div>
            </button>
        </div>
    );
}

export default ListMenu;