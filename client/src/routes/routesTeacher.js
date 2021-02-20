import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import Group from '../components/pages/teacher/GroupTeacher.js';
import Sidebar from '../components/sidebar/Sidebar';
import CreateChallenge from '../components/pages/teacher/CreateChallenge.js';
import EditChallenge from '../components/pages/teacher/EditChallenge.js';
import StudentList from '../components/pages/user/StudentLits.js';
import LinksTeacher from '../links/links-Teacher.js';
/*defino las rutas de los componentes
Rutas o urls del Teacher asociado a la componente pages/teacher*/
function Routes() {
  let {url} = useRouteMatch();
    return (
      <>
        <BrowserRouter>
          <Sidebar links={LinksTeacher} url={url} />
            <Switch>
              <Route exact path="/teacher/getGroups" component={Group} />
              <Route exact path="/teacher/getGroups/createChallenge/:id" component={CreateChallenge} />
              <Route exact path="/teacher/getGroups/:id/editChallenge/:idChallenge" component={EditChallenge} />
              <Route exact path="/teacher/students" component={StudentList}/>
            </Switch>
        </BrowserRouter>
      </>  
    );
  }

export default Routes;