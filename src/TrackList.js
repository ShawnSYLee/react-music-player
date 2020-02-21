import React, { useContext } from 'react';
import { MusicContext } from './MusicContext';

const TrackList = () => {
    const [state, setState] = useContext(MusicContext);
    return (
        <button onClick={()=> {
            setState(state => ({
                ...state, name: 'Clicked!'
            }))
        }}>
            {state.name}
        </button>
    )
}

export default TrackList;