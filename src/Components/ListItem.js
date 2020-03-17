import React from 'react';
import { useHistory } from 'react-router-dom';

import DotsIcon from '../assets/icons/dots.svg';

export const PlaylistListItem = ({ 
    id,
    playlist,
    curplaylist,
    data
}) => {
    let history = useHistory();

    return (
        <div>
            <button
                onClick={() => { history.push('/' + id) }}
                className="playlistlist-container"
                style={playlist.name === curplaylist.name ? { color: data.vibrant } : {}}
            >
                <img className="img-playlistlistcover" src={playlist.thumbs[0]} />
                <div className="playlistlist-textcontainer" >
                    <div className="txt-tracktitle">{playlist.name}</div>
                    <div className="txt-trackinfo">By {playlist.author}</div>
                </div>
            </button>
        </div>
    );
}

export const SongListItem = ({
    i,
    track,
    curtrack,
    data,
    curPlaylist,
    activePlaylist,
    pathname,
    changeTrack,
    toggle
}) => {
    return (
        <div className="track-container">
            <button className="track-button"
                onClick={() => {
                    changeTrack(pathname.substring(1), i);
                }}
            >
                <img src={track.thumbs[0]} className="track-img" />
                <div className="track-textwrapper">
                    <div className="txt-tracktitle"
                        style={track.title == curtrack.title && curPlaylist.id == activePlaylist.id ? { color: data.vibrant } : {}}
                    >
                        {track.title}
                    </div>
                    <div className="txt-trackinfo">
                        {track.artist.join(', ')} | {track.album}
                    </div>
                </div>
            </button>
            <img className="track-dots" src={DotsIcon} onClick={() => { toggle(track) }} />
        </div>
    );
}
