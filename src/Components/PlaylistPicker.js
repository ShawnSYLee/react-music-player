import React, { useContext } from 'react';

import { MusicContext } from '../Contexts/MusicContext';
import { DisplayContext } from '../Contexts/DisplayContext';

import { PlaylistListItem } from './ListItem';

import useDisplay from '../Hooks/useDisplay';

import BackIcon from '../assets/icons/back.svg';

export const PlaylistPicker = () => {
    const [state] = useContext(MusicContext);
    const [display] = useContext(DisplayContext);
    const {
        closePlaylistPicker
    } = useDisplay();

    return (
        <div className="playlist-picker-page"
            style={{ display: display.inPlaylistPicker ? 'block' : 'none' }}
        >
            <div className="Header">
                <button className="btn-topicon"
                    onClick={closePlaylistPicker}
                >
                    <img className="icon" src={BackIcon} alt="back button" />
                </button>
                <span className="txt-label">Add to Playlist</span>
            </div>
            <div className="playlist-picker" >
                {Object.keys(state.playlists).map((pl, i) =>
                    <PlaylistListItem
                        key={pl}
                        i={i}
                        id={Object.keys(state.playlists)[i]}
                        playlist={state.playlists[pl]}
                    />
                )}
            </div>
        </div>
    );
}