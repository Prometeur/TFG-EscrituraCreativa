/*
*  Name_file :routesStudent.js
*  Description: contiene rutas asociadas a componentes del Student
*/
import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar.js';
import GroupStudent from '../components/pages/student/GroupStudent.js';
import Writings from '../components/pages/student/Writings.js';
import Writing from '../components/pages/student/Writing.js';
import LinksStudent from '../links/links-Student.js';

/*defino las rutas de los componentes
Rutas o urls del Student asociado a la componente pages/student*/
function Routes() {
    let {url} = useRouteMatch();
    return (
        <BrowserRouter>
            <Sidebar  links={LinksStudent} url={url}/>
            <Switch>
                <Route exact path="/student/challenges" component={GroupStudent} /> 
                <Route exact path="/student/challenges/:id/viewChallenge/:idChallenge" component={Writing} />
                <Route exact path="/student/challenges/:id/writings/:idChallenge" component={Writings} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;