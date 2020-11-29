import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Landing from './pages/landing';
import Locations from './pages/locations';

import './styles/global.css'

export const Routes:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/locations' component={Locations}/>
      </Switch>
    </BrowserRouter>
  )
}