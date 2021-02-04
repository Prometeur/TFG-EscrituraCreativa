/*
*  Name_file :routesTeacher.js
*  Description: contiene rutas asociadas a componentes del Teacher
*/

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/pages/teacher/Home';
import Challenges from '../components/pages/teacher/Challenges';
import Challenge from '../components/pages/teacher/Challenge/Challenge';
import EditChallenge from '../components/pages/teacher/Challenge/EditChallenge';
import Group from '../components/pages/teacher/Group';


/*defino las rutas de los componentes
Rutas o urls del Teacher asociado a la componente pages/teacher*/
function Routes() {
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/teacher/home" component={Home} />
        <Route exact path="/teacher/group" component={Group} />
        <Route exact path="/teacher/challenges" component={Challenges} />
        <Route exact path="/teacher/challenge" component={Challenge} />
        <Route exact path="/teacher/editChallenge" component={EditChallenge} />
        </Switch>
      </BrowserRouter>
    );
  }

export default Routes;