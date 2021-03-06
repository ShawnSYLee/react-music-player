import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MusicPlayer from './Views/MusicPlayer';
import ListMenu from './Views/ListMenu';
import MainScreen from './Views/MainScreen';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={MainScreen} />
            <Route exact path='/player' component={MusicPlayer} />
            <Route path='/playlist=:playlist' component={ListMenu} />
        </Switch>

    );
}

export default Main;
