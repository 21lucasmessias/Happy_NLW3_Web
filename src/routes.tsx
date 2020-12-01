import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Landing from './pages/landing';
import Orphanages from './pages/orphanages';
import OrphanageCreate from './pages/orphanageCreate';

import './styles/global.css'
import OrphanagesDetails from './pages/orphanagesDetails';

export const Routes:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/orphanages' component={Orphanages}/>
        <Route exact path='/orphanages/create' component={OrphanageCreate}/>
        <Route exact path='/orphanages/details/:id' component={OrphanagesDetails}/>
      </Switch>
    </BrowserRouter>
  )
}