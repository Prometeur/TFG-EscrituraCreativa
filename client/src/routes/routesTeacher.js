/*
*  Name_file :routesTeacher.js
*  Description: contiene rutas asociadas a componentes del Teacher
*/

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeTeacher from '../components/pages/teacher/HomeTeacher';
import GroupTeacher from '../components/pages/teacher/GroupTeacher';
import Challenge from '../components/pages/teacher/Challenge';
import SearchStudentRes from '../components/pages/teacher/StudentList';

/*defino las rutas de los componentes
Rutas o urls del Teacher asociado a la componente pages/teacher*/
function Routes() {
    return (
      <BrowserRouter>
        <Switch>
        <Route exact path="/homeTeacher" component={HomeTeacher} />
        <Route exact path="/groupTeacher" component={GroupTeacher} />
        <Route exact path="/challenge" component={Challenge} />
        <Route exact path="/StudentList" component={SearchStudentRes} />
        </Switch>
      </BrowserRouter>
    );
  }

export default Routes;