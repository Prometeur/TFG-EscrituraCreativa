import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
<<<<<<< HEAD
import Group from '../components/pages/teacher/GroupTeacher.js';
import Sidebar from '../components/sidebar/Sidebar.js';
import CreateChallenge from '../components/pages/teacher/CreateChallenge.js';
import EditChallenge from '../components/pages/teacher/EditChallenge.js';
import StudentList from '../components/pages/user/StudentLits.js';
import LinksTeacher from '../links/links-Teacher.js';
import Profile from '../components/pages/user/Profile.js';
=======
import Groups from '../components/pages/teacher/GroupTeacher.js';
import Sidebar from '../components/sidebar/Sidebar';
import CreateChallenge from '../components/pages/teacher/CreateChallenge.js';
import EditChallenge from '../components/pages/teacher/EditChallenge.js';
import LinksTeacher from '../links/links-Teacher.js';

>>>>>>> luis
/*defino las rutas de los componentes
Rutas o urls del Teacher asociado a la componente pages/teacher*/
function Routes() {
  let {url} = useRouteMatch();
    return (
      <>
        <BrowserRouter>
          <Sidebar links={LinksTeacher} url={url} />
            <Switch>
<<<<<<< HEAD
              <Route exact path="/teacher/getGroups" component={Group} />
              <Route exact path="/teacher/getGroups/createChallenge/:id" component={CreateChallenge} />
              <Route exact path="/teacher/getGroups/:id/editChallenge/:idChallenge" component={EditChallenge} />
              <Route exact path="/teacher/students" component={StudentList}/>
              <Route exact path="/teacher/students/viewProfile/:idStudent" component={Profile} />
=======
              <Route exact path="/teacher/groups" component={Groups} />
              {/* <Route exact path="/teacher/getGroups/createChallenge/:id" component={CreateChallenge} /> */}
              <Route exact path="/teacher/createChallenge/:idGroup" component={CreateChallenge} />
              {/* <Route exact path="/teacher/getGroups/:id/editChallenge/:idChallenge" component={EditChallenge} /> */}
              <Route exact path="/teacher/editChallenge/:idGroup/:idChallenge" component={EditChallenge} />
>>>>>>> luis
            </Switch>
        </BrowserRouter>
      </>  
    );
  }

export default Routes;