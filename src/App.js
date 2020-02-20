import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Slider,
  Progress
} from "shards-react";
import {
  FiChevronLeft,
  FiPlus,
  FiPlay,
  FiSkipBack,
  FiSkipForward
} from "react-icons/fi";
import testaudio from './assets/SHY Martin - Good Together.mp3';

function App() {
  return (
    <div className="App">
      <Header />
      <MusicInfo />
      <Controller />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  return (
    <div className="Header">
      <Button pill theme="light">
        <FiChevronLeft className="icon" />
      </Button>
      <span className="txt-label">Player</span>

      <Dropdown open={open} toggle={toggle} className="dropdown-plus">
        <DropdownToggle pill theme="light">
          <FiPlus className="icon" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function MusicInfo() {
  let artist = "SHY Martin"
  let title = "Good Together"

  return (
    <div className="MusicInfo">
      <img src="https://m.media-amazon.com/images/I/91EADvEUjXL._SS500_.jpg" className="img-coverart" alt="cover art" />
      <div className="txt-subtitle">{artist}</div>
      <div className="txt-title">{title}</div>
    </div>

  );
}

function Controller() {
  const audioManager = useRef();
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0.0);

  useEffect(() => {
    audioManager.current.addEventListener('timeupdate', updateProgress);
  }, [])

  useEffect(() => {
    return () => {
      audioManager.current.removeEventListener('timeupdate', updateProgress);
    }
  }, [])

  function togglePlay() {
    setPlay(!play)
    if (play) {
      audioManager.current.play();
    } else {
      audioManager.current.pause();
    }
  }

  function updateProgress() {
    const { duration, currentTime } = audioManager.current;
    console.log(currentTime);
    console.log(duration);
    console.log(currentTime / duration);
    setProgress((currentTime / duration) * 100);
    console.log(progress);
  }

  return (
    <div className="Controller">
      <audio
        src={testaudio}
        autoPlay={play}
        preload="auto"
        ref={audioManager}
      />
      <div className="control-row">
        <Button pill theme="light" className="btn-control"><FiSkipBack className="icon" /></Button>
        <Button pill className="btn-control"
          onClick={togglePlay}
        >
          <FiPlay className="largeicon" />
        </Button>
        <Button pill theme="light" className="btn-control"><FiSkipForward className="icon" /></Button>
      </div>
      {/* <Slider connect={[true, false]} start={[20]} range={{ min: 0, max: 100 }} /> */}
      <Progress value={progress} />
    </div>
  );
}

export default App;
