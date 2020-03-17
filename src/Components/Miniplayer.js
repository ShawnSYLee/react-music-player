import React from 'react';
import '../App.css';
import PlusIcon from '../assets/icons/plus.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlayIcon from '../assets/icons/play.svg';
import { FiPlay, FiPause, FiPlus } from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link, useHistory } from 'react-router-dom';

import ProgressBar from '../Components/ProgressBar';
import useAudio from "../Hooks/useAudio";

const Miniplayer = () => {
    const {
        togglePlay,
        activeSong,
        play,
        playlist,
        index
    } = useAudio();
    const { data } = usePalette(activeSong.thumbs[0])
    let history = useHistory();

    return (
        <div className="miniplayer-container" style={{ display: index < 0 ? 'none' : 'block' }}>
            <div className="miniplayer">
                <div className="art-container">
                    <button
                        className="miniplaybutton"
                        onClick={togglePlay}
                        style={{ backgroundImage: 'url(\'' + activeSong.thumbs[0] + '\')', backgroundSize: 'contain' }}
                    >
                        {play === false && <img src={PlayIcon} style={{opacity: '0.3'}} className="playicon" />}
                        {play === true && <img src={PauseIcon} style={{opacity: '0.3'}} className="largeicon" />}
                    </button>
                </div>
                <div className="wrapper-stack" onClick={()=> history.push('/player')}>
                    <div className="container-row">
                        <div className="container-stack">
                            <div className="txt-minisubtitle">{activeSong.artist.join(', ')}</div>
                            <div className="txt-minititle">{activeSong.title}</div>
                        </div>
                        <button className="btn-miniplayericon"
                            onClick={()=> history.push('/player')}
                        >
                            <img src={PlusIcon} className="icon" />
                        </button>
                    </div>
                    <ProgressBar color={data.vibrant} />
                </div>
            </div>
        </div>
    );
}

export default Miniplayer;