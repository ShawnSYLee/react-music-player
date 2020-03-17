import React, { useState, useContext } from 'react';

import { MusicContext } from '../Contexts/MusicContext';

const DisplayContext = React.createContext([{}, () => { }]);

const DisplayProvider = (props) => {
    const [state] = useContext(MusicContext);

    const [display, setDisplay] = useState({
        inModal: false,
        inPlaylistPicker: false,
        displaySong: state.tracks[0]
    });

    return (
        <DisplayContext.Provider value={[display, setDisplay]}>
            {props.children}
        </DisplayContext.Provider>
    );
}

export { DisplayContext, DisplayProvider };