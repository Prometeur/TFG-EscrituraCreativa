/*
*  Name_file :routesTeacher.js
*  Description: contiene rutas asociadas a componentes del Teacher
*/

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TeacherBoard from '../components/pages/teacher/TeacherBoard';
import GroupTeacher from '../components/pages/teacher/GroupTeacher';
import Challenge from '../components/pages/teacher/Challenge';

/*defino las rutas de los componentes
Rutas o urls del Teacher asociado a la componente pages/teacher*/
function Routes() {
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/teacher" component={TeacherBoard} />
        <Route exact path="/groupTeacher" component={GroupTeacher} />
        <Route exact path="/challenge" component={Challenge} />
        </Switch>
      </BrowserRouter>
    );
  }

export default Routes;