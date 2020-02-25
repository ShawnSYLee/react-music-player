import React from 'react';
import '../App.css';

import BackIcon from '../assets/icons/back.svg';

import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

import Miniplayer from '../Components/Miniplayer';
import useAudio from "../Hooks/useAudio";

const MainScreen = () => {
    const {
        changeTrack,
        activeSong,
        playlist,
        playlists,
        tracks,
        index
    } = useAudio();
    const { data } = usePalette(playlist.cover);

    return (
        <>
            <div className="Header">
                <span className="txt-label">Music</span>
            </div>
            <div className="track-list">
                {Object.keys(playlists).map((pl, i) => 
                    <Playlist key={pl} i={i} playlist={playlists[pl].info} curplaylist={playlist} data={data} />
                )}
                <div style={{ marginBottom: index < 0 ? '2rem' : '8rem' }} >
                </div>
            </div>
            <Miniplayer />
        </>
    );
}

const Playlist = ({ i, playlist, curplaylist, data, func }) => {
    return (
        <div>
            <Link to='/playlist'>
                <button
                    className="track-container"
                    style={playlist.name === curplaylist.name ? { color: data.vibrant } : {}}
                >
                    <div className="txt-tracktitle">{playlist.name}</div>
                    <div className="txt-trackinfo">{playlist.author}</div>
                </button>
            </Link>
        </div>
    );
}

export default MainScreen;