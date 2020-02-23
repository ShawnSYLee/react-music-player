import React, { useState } from 'react';
import '../App.css';
import useAudio from "../Hooks/useAudio";

const ProgressSlider = ({ color, accent }) => {
    const {
        starttime,
        audio,
        progress,
        adjustProgress,
        formatTime
    } = useAudio();
    const [scrubProgress, setScrubProgress] = useState(progress);
    const [scrubbing, setScrubbing] = useState(false);

    function scrub(e) {
        if (!scrubbing) setScrubbing(true);
        setScrubProgress(e.target.value);
        if (e.type !== "change") {
            setScrubbing(false);
            adjustProgress(scrubProgress);
        }
    }

    return (
        <div className="progressslider-wrapper">
            <div className="progressslider-container">
                <div className="progressslider-bar" style={{ width: scrubbing ? scrubProgress + '%' : progress + '%',  backgroundColor: scrubbing ? accent : 'white', backgroundImage: scrubbing ? 'linear-gradient(to right, ' + color + ', ' + accent + ')' : 'none' }}>
                </div>
                <input type="range" className="progressslider" step="0.01" onChange={scrub} onTouchEnd={scrub} />
                <div className="time-row">
                    <div className="left-time" style={{ color: scrubbing ? 'white' : '' }}>{scrubbing ? formatTime(scrubProgress / 100 * audio.duration) : starttime}</div>
                    <div className="right-time">{formatTime(audio.duration)}</div>
                </div>
            </div>
        </div>
    );
}

export default ProgressSlider;