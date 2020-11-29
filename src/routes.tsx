import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Landing from './pages/landing';
import Orphanages from './pages/orphanages';
import NewOrphanage from './pages/newOrphanage';

import './styles/global.css'

export const Routes:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/orphanages' component={Orphanages}/>
        <Route exact path='/orphanages/create' component={NewOrphanage}/>
      </Switch>
    </BrowserRouter>
  )
}