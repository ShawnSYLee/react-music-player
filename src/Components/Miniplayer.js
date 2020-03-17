import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePalette } from 'react-palette';

import ProgressBar from '../Components/ProgressBar';

import useAudio from "../Hooks/useAudio";

import PlusIcon from '../assets/icons/plus.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlayIcon from '../assets/icons/play.svg';

import '../Styles/App.css';

const Miniplayer = () => {
    const {
        togglePlay,
        activeSong,
        play,
        index
    } = useAudio();
    const { data } = usePalette(activeSong.thumbs[0])
    let history = useHistory();

    return (
        <div className="miniplayer-container"
            style={{ display: index < 0 ? 'none' : 'block' }}
        >
            <div className="miniplayer">
                <div className="art-container">
                    <button
                        className="miniplaybutton"
                        onClick={togglePlay}
                        style={{
                            backgroundImage: 'url(\'' + activeSong.thumbs[0] + '\')',
                            backgroundSize: 'contain' 
                        }}
                    >
                        {play === false && <img className="playicon"
                            src={PlayIcon}
                            alt="play button"
                            style={{opacity: '0.3'}}
                        />}
                        {play === true && <img className="largeicon"
                            src={PauseIcon}
                            alt="pause button"
                            style={{opacity: '0.3'}}
                        />}
                    </button>
                </div>
                <div className="wrapper-stack" 
                    onClick={() => history.push('/player')}
                >
                    <div className="container-row">
                        <div className="container-stack">
                            <div className="txt-minisubtitle">{activeSong.artist.join(', ')}</div>
                            <div className="txt-minititle">{activeSong.title}</div>
                        </div>
                        <button className="btn-miniplayericon"
                            onClick={() => history.push('/player')}
                        >
                            <img className="icon"
                                src={PlusIcon}
                                alt="plus button"
                            />
                        </button>
                    </div>
                    <ProgressBar color={data.vibrant} />
                </div>
            </div>
        </div>
    );
}

export default Miniplayer;