import React, { useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Slider
} from "shards-react";
import {
  FiChevronLeft,
  FiPlus,
  FiPlay,
  FiSkipBack,
  FiSkipForward
} from "react-icons/fi";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

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
      <img src="https://m.media-amazon.com/images/I/91EADvEUjXL._SS500_.jpg" className="img-coverart" />
      <div className="txt-subtitle">{artist}</div>
      <div className="txt-title">{title}</div>
    </div>

  );
}

function Controller() {
  return (
    <div className="Controller">
      <div className="control-row">
        <Button pill theme="light" className="btn-control"><FiSkipBack className="icon" /></Button>
        <Button pill className="btn-control"><FiPlay className="largeicon" /></Button>
        <Button pill theme="light" className="btn-control"><FiSkipForward className="icon" /></Button>
      </div>
      <Slider connect={[true, false]} start={[20]} range={{ min: 0, max: 100 }} />
    </div>
  );
}

export default App;
