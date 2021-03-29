/*
*  Name_file :routesStudent.js
*  Description: contiene rutas asociadas a componentes del Student
*/
import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar.js';
import GroupStudent from '../components/pages/student/GroupStudent.js';
import TeamsStudent from '../components/pages/student/TeamsStudent.js';
import CreateWriting from '../components/pages/student/CreateWriting.js';
import EditWriting from '../components/pages/student/EditWriting.js';
import LinksStudent from '../links/links-Student.js';
// import Teams from '../components/pages/student/Teams.js';
// import Messenger from '../components/pages/student/Messenger.js';
// import Message from '../components/pages/student/Message.js';


/*defino las rutas de los componentes
Rutas o urls del Student asociado a la componente pages/student*/
function Routes() {
    let {url} = useRouteMatch();
    return (
        <BrowserRouter>
            <Sidebar  links={LinksStudent} url={url}/>
            <Switch>
            
                {/* <Route exact path="/student/challenges" component={GroupStudent} />  */}
                <Route exact path="/student/groups" component={GroupStudent} /> 
                <Route exact path="/student/teamsStudent" component={TeamsStudent} /> 
                {/* <Route exact path="/student/teams" component={Teams} />  */}
                {/* <Route exact path="/student/messenger" component={Messenger} /> 
                <Route exact path="/student/message/:idMessage" component={Message} />  */}
                {/* <Route exact path="/student/challenges/:id/viewChallenge/:idChallenge" component={Writing} />
                <Route exact path="/student/challenges/:id/writings/:idChallenge" component={Writings} /> */}
                <Route exact path="/student/writing/:idGroup/:idChallenge" component={CreateWriting} />
                {/* <Route exact path="/student/editWriting/:idGroup/:idChallenge" component={EditWriting} /> */}
                <Route exact path="/student/editWriting/:idGroup/:idChallenge/:idWriting" component={EditWriting} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;