import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Slider, Progress } from "shards-react";
import { FiChevronLeft, FiMessageSquare } from "react-icons/fi";
import Miniplayer from './Miniplayer';
import useAudio from "./useAudio";
import { usePalette } from 'react-palette';

const ListMenu = () => {
    const {
        nextSong,
        prevSong,
        togglePlay,
        adjustProgress,
        progress,
        activeSong,
        starttime,
        play,
        audio,
        formatTime,
        playlist,
        tracks
    } = useAudio();
    const { data, loading, error } = usePalette(activeSong.cover);
    console.log(tracks);

    return (
        <>
            <div className="Header">
                <button className="btn-icon">
                    <FiChevronLeft className="icon" />
                </button>
                <span className="txt-label">Music</span>
            </div>
            <div className="playlistinfo-container">
                <img src="/assets/images/Flow.jpg" className="playlist-cover" />
                <div className="playlist-info" >
                    <div className="txt-playlistinfo">By {playlist.author}</div>
                    <div className="txt-playlisttitle">{playlist.name}</div>
                    <div className="txt-playlistinfo">{tracks.length} Songs</div>
                </div>
            </div>
            {tracks.map((track, i) =>
                <Track key={i} track={track} />
            )}
            <Miniplayer />
        </>
    );
}

const Track = ({ track }) => {
    return (
        <div>
            <button className="track-container">
                <div className="txt-tracktitle">{track.title}</div>
                <div className="txt-trackinfo">{track.artist} | {track.album}</div>
            </button>
        </div>
    );
}

export default ListMenu;