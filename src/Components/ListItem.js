import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { MusicContext } from '../Contexts/MusicContext';
import { DisplayContext } from '../Contexts/DisplayContext';

import useAudio from '../Hooks/useAudio';
import useDisplay from '../Hooks/useDisplay';

import DotsIcon from '../assets/icons/dots.svg';
import AddPlaylistIcon from '../assets/icons/PlusSquareBtn.jpg';

const PlaylistListItem = ({ id, playlist, data }) => {
    const [state] = useContext(MusicContext);
    const [display] = useContext(DisplayContext)
    let history = useHistory();
    const {
        addToPlaylist
    } = useAudio();
    const {
        closeModal,
        closePlaylistPicker
    } = useDisplay();
    
    return (
        <div>
            <button
                onClick={() => { 
                    if (display.inPlaylistPicker) {
                        addToPlaylist(id, display.displaySong.id);
                        closePlaylistPicker();
                        closeModal();
                    } else {
                        history.push('/playlist=' + id);
                    }
                }}
                className="playlistlist-container"
                style={(data) && playlist.name === state.playlist.name ? { color: data.vibrant } : {}}
            >
                <img className="img-playlistlistcover" 
                    src={playlist.thumbs !== undefined ? playlist.thumbs[0] : state.pthumb} 
                    alt="playlist cover art" 
                />
                <div className="playlistlist-textcontainer" >
                    <div className="txt-tracktitle">{playlist.name}</div>
                    <div className="txt-trackinfo">By {playlist.author}</div>
                </div>
            </button>
        </div>
    );
}

const AddPlaylistListItem = () => {
    const [state] = useContext(MusicContext);
    const {
        createPlaylist
    } = useAudio();

    return (
        <div>
            <button
                onClick={() => {createPlaylist("test")}}
                className="playlistlist-container"
            >
                <img className="img-playlistlistcover" 
                    src={AddPlaylistIcon}
                    alt="add playlist icon" 
                />
                <div className="playlistlist-textcontainer" >
                    <div className="txt-tracktitle">Create Playlist</div>
                </div>
            </button>
        </div>
    );
}

const SongListItem = ({
    i,
    track,
    data,
    playlistid,
}) => {
    const [state] = useContext(MusicContext);
    const {
        changeTrack
    } = useAudio();
    const {
        openModal,
        closeModal,
        setDisplaySong
    } = useDisplay();

    return (
        <div className="track-container">
            <button className="track-button"
                onClick={() => {
                    changeTrack(playlistid, i);
                }}
            >
                <img className="track-img"
                    src={track.thumbs[0]}
                    alt="track thumbnail"
                />
                <div className="track-textwrapper">
                    <div className="txt-tracktitle"
                        style={track.title === state.activeSong.title && state.playlist.id === state.displayinfo.id ? { color: data.vibrant } : {}}
                    >
                        {track.title}
                    </div>
                    <div className="txt-trackinfo">
                        {track.artist.join(', ')} | {track.album}
                    </div>
                </div>
            </button>
            <img className="track-dots"
                src={DotsIcon}
                alt="dots button"
                onClick={() => {
                    openModal(track);
                    setDisplaySong(track);
                }}
            />
        </div>
    );
}

export { PlaylistListItem, AddPlaylistListItem, SongListItem };
