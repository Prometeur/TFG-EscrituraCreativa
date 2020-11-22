/*
*  Name_file :routesStudent.js
*  Description: contiene rutas asociadas a componentes del Student
*/
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeStudent from '../components/pages/student/HomeStudent';
import GroupStudent from '../components/pages/student/GroupStudent';
import Writing from '../components/pages/student/Writing';

/*defino las rutas de los componentes
Rutas o urls del Student asociado a la componente pages/student*/
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/homeStudent" component={HomeStudent} />
                <Route exact path="/groupStudent" component={GroupStudent} />
                <Route exact path="/writing" component={Writing} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;