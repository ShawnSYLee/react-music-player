import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MusicPlayer from './Views/MusicPlayer';
import ListMenu from './Views/ListMenu';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={ListMenu} />
            <Route exact path='/player' component={MusicPlayer} />
        </Switch>

    );
}

export default Main;
