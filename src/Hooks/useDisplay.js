import { useContext, useEffect, useState } from 'react';

import { DisplayContext } from '../Contexts/DisplayContext';

const useDisplay = () => {
    const [display, setDisplay] = useContext(DisplayContext);

    function openModal() {
        setDisplay(display => ({ ...display, inModal: true }))
    }

    function closeModal() {
        setDisplay(display => ({ ...display, inModal: false }))
    }

    function openPlaylistPicker() {
        setDisplay(display => ({ ...display, inPlaylistPicker: true }))
    }

    function closePlaylistPicker() {
        setDisplay(display => ({ ...display, inPlaylistPicker: false }))
    }

    function setDisplaySong(song) {
        setDisplay(display => ({
            ...display,
            inModal: true,
            displaySong: song
        }))
    }

    return {
        openModal,
        closeModal,
        openPlaylistPicker,
        closePlaylistPicker,
        setDisplaySong
    }
};

export default useDisplay;