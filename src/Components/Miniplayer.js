import React from 'react';
import '../App.css';
import { FiPlay, FiPause, FiPlus } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

import ProgressBar from '../Components/ProgressBar';
import useAudio from "../Hooks/useAudio";

const Miniplayer = () => {
    const {
        togglePlay,
        activeSong,
        play,
        progress,
        playlist
    } = useAudio();
    const { data, loading, error } = usePalette(playlist.cover)

    return (
        <div className="miniplayer-container">
            <div className="miniplayer">
                <div className="art-container">
                    <button
                        className="miniplaybutton"
                        onClick={togglePlay}
                        style={{backgroundImage: 'url(\'' + activeSong.cover + '\')', backgroundSize: 'contain'}}
                    >
                        {play === false && <FiPlay className="playicon" />}
                        {play === true && <FiPause className="largeicon" />}
                    </button>
                </div>
                <div className="wrapper-stack">
                    <div className="container-row">
                        <Link to="/player" style={{color: 'rgb(50, 50, 50)'}}><div className="container-stack">
                            <div className="txt-minisubtitle">{activeSong.artist}</div>
                            <div className="txt-minititle">{activeSong.title}</div>
                        </div></Link>
                        <button className="btn-miniplayericon">
                            <FiPlus className="icon" />
                        </button>
                    </div>
                    <ProgressBar value={progress} color={data.vibrant}/>
                </div>

            </div>
        </div>
    );
}

export default Miniplayer;