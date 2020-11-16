/*
*  Name_file :App.js
*  Description: redirije a routes.js
*/

import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import RoutesLogin from './routes/routesLogin';
import RoutesAdmin from './routes/routesAdmin';
import RoutesTeacher from './routes/routesTeacher';
import RoutesStudent from './routes/routesStudent';

function App() 
{
  return (
    <div className="App">
      <Routes />
      <RoutesLogin />
      <RoutesAdmin />
      <RoutesTeacher />
      <RoutesStudent />
    </div>
  );
}

export default App;
