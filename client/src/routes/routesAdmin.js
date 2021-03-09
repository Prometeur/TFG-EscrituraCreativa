/*
*  Name_file :routesAdmin.js
*  Description: contiene rutas asociadas a componentes del Admin
*/
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeAdmin from '../components/pages/admin/HomeAdmin';
import UserList from '../components/pages/admin/UserList';
import Profile from '../components/pages/admin/ProfileA';
import Group from '../components/pages/admin/GroupA';
import Groups from '../components/pages/admin/GroupAList';

/*defino las rutas de los componentes
Rutas o urls del Admin asociado a la componente pages/admin*/
function Routes() {
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/homeAdmin" component={HomeAdmin} />
        <Route exact path="/UserList" component={UserList} />
        <Route exact path="/ProfileA" component={Profile} />
        <Route exact path="/GroupA" component={Group} />
        <Route exact path="/GroupList" component={Groups} />
        </Switch>
      </BrowserRouter>
    );
  }

export default Routes;