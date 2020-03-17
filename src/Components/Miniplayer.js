import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { usePalette } from 'react-palette';

import { MusicContext } from '../Contexts/MusicContext';

import ProgressBar from '../Components/ProgressBar';

import useAudio from "../Hooks/useAudio";

import PlusIcon from '../assets/icons/plus.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlayIcon from '../assets/icons/play.svg';

import '../Styles/App.css';

const Miniplayer = () => {
    const [state] = useContext(MusicContext);
    const {
        togglePlay,
        play
    } = useAudio();
    const { data } = usePalette(state.activeSong.thumbs[0])
    let history = useHistory();

    return (
        <div className="miniplayer-container"
            style={{ display: state.index < 0 ? 'none' : 'block' }}
        >
            <div className="miniplayer">
                <div className="art-container">
                    <button
                        className="miniplaybutton"
                        onClick={togglePlay}
                        style={{
                            backgroundImage: 'url(\'' + state.activeSong.thumbs[0] + '\')',
                            backgroundSize: 'contain' 
                        }}
                    >
                        {state.play === false && <img className="playicon"
                            src={PlayIcon}
                            alt="play button"
                            style={{opacity: '0.3'}}
                        />}
                        {state.play === true && <img className="largeicon"
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
                            <div className="txt-minisubtitle">{state.activeSong.artist.join(', ')}</div>
                            <div className="txt-minititle">{state.activeSong.title}</div>
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