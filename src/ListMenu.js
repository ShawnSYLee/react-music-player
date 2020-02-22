import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { FormInput } from "shards-react";
import { FiChevronLeft, FiMessageSquare } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

import Miniplayer from './Miniplayer';
import useAudio from "./useAudio";

const ListMenu = () => {
    const {
        changeTrack,
        activeSong,
        playlist,
        tracks
    } = useAudio();
    // const { data, loading, error } = usePalette(activeSong.cover);

    return (
        <>
            <div className="Header">
                <button className="btn-icon">
                    <FiChevronLeft className="icon" />
                </button>
                <span className="txt-label">Music</span>
            </div>
            <div className="playlisttop-wrapper">
                <div className="playlistinfo-container">
                    <img src="/assets/images/Flow.jpg" className="playlist-cover" />
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
                    <Track key={track.title} i={i} track={track} func={changeTrack} />
                )}
                {tracks.map((track, i) =>
                    <Track key={track.title} i={i} track={track} func={changeTrack} />
                )}
            </div>
            <Miniplayer />
        </>
    );
}

const Track = ({ i, track, func }) => {
    return (
        <div>
            <button className="track-container"
                onClick={() => func(i)}
            >
                <div className="txt-tracktitle">{track.title}</div>
                <div className="txt-trackinfo">{track.artist} | {track.album}</div>
            </button>
        </div>
    );
}

export default ListMenu;