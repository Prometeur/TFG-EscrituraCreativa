/*
*  Name_file :Router.js
*  Description: contiene rutas asociadas a componentes
*/

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/pages/home/Home';


/*defino las rutas de los componentes
ejemplo ruta o url del login donde estara alojado/relacionado el componente Login*/
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
