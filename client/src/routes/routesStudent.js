/*
*  Name_file :routesStudent.js
*  Description: contiene rutas asociadas a componentes del Student
*/
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/pages/student/Home';
import Challenges from '../components/pages/student/Challenges';
import Writing from '../components/pages/student/Writing';
import Writings from '../components/pages/student/Writings';
import Group from '../components/pages/student/Group';

/*defino las rutas de los componentes
Rutas o urls del Student asociado a la componente pages/student*/
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/student/home" component={Home} />
                <Route exact path="/student/group" component={Group} /> 
                <Route exact path="/student/challenges" component={Challenges} />
                <Route exact path="/student/writings" component={Writings} />
                <Route exact path="/student/writing" component={Writing} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;