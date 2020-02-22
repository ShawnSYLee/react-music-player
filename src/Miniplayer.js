import React from 'react';
import './App.css';
import { FiPlay, FiPause, FiPlus } from "react-icons/fi";
import useAudio from "./useAudio";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

const Miniplayer = () => {
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
        formatTime
    } = useAudio();
    const { data, loading, error } = usePalette(activeSong.cover)

    return (
        <div className="miniplayer-container">
            <div className="miniplayer">
                <div className="art-container">
                    <button
                        className="miniplaybutton"
                        onClick={togglePlay}
                    >
                        {play === false && <FiPlay className="playicon" />}
                        {play === true && <FiPause className="largeicon" />}
                    </button>
                    <img src={activeSong.cover} className="img-minicoverart" />
                </div>
                <Link to="/player"><div className="wrapper-stack">
                <button className="container-stack">
                    <div className="txt-minisubtitle">{activeSong.artist}</div>
                    <div className="txt-minititle">{activeSong.title}</div>
                </button>
                </div></Link>
                <button className="btn-miniplayericon">
                    <FiPlus className="icon" />
                </button>
            </div>
        </div>
    );
}

export default Miniplayer;