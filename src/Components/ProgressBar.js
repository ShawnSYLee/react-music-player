import React, { useContext } from 'react';

import { MusicContext } from '../Contexts/MusicContext';

import '../Styles/App.css';

const ProgressBar = ({ color }) => {
    const [state] = useContext(MusicContext);

    return (
        <div className="progressbar-container">
            <div className="progressbar-bar" 
                style={{
                    width: state.progress + '%',
                    backgroundColor: color }}
            />
        </div>
    );
}

export default ProgressBar;