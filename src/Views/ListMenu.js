import React, { useEffect } from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { FormInput } from "shards-react";
import { FiChevronLeft, FiMessageSquare } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

import Miniplayer from '../Components/Miniplayer';
import useAudio from "../Hooks/useAudio";

const ListMenu = () => {
    const {
        changeTrack,
        activeSong,
        playlist,
        tracks
    } = useAudio();
    const { data, loading, error } = usePalette(playlist.cover);

    return (
        <>
            <div className="Header">
                <button className="btn-icon">
                    <FiChevronLeft className="icon" />
                </button>
                <span className="txt-label">Playlist</span>
            </div>
            <div className="playlisttop-wrapper">
                <div className="playlistinfo-container">
                    <img src={playlist.cover} className="playlist-cover" />
                    <div className="playlist-info" >
                        <div className="txt-playlistinfo">By {playlist.author}</div>
                        <div className="txt-playlisttitle">{playlist.name}</div>
                        <div className="txt-playlistinfo">{tracks.length} Songs</div>
                    </div>
                </div>
                <div className="playlist-search-container" >
                    <div className="search-bar">Search</div>
                </div>
            </div>
            <div className="track-list">
                {tracks.map((track, i) =>
                    <Track key={track.title} i={i} track={track} curtrack={activeSong} data={data} func={changeTrack} />
                )}
                {tracks.map((track, i) =>
                    <Track key={track.title} i={i} track={track} curtrack={activeSong} data={data} func={changeTrack} />
                )}
            </div>
            <Miniplayer />
        </>
    );
}

const Track = ({ i, track, curtrack, data, func }) => {
    
    return (
        <div>
            <button className="track-container" style={track.title == curtrack.title ? {color: data.vibrant} : {}}
                onClick={() => func(i)}
            >
                <div className="txt-tracktitle">{track.title}</div>
                <div className="txt-trackinfo">{track.artist} | {track.album}</div>
            </button>
        </div>
    );
}

export default ListMenu;