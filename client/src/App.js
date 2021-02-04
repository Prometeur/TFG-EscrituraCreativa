/*
*  Name_file :App.js
*  Description: redirije a routes.js
*/

import React from 'react';
import './App.css';
import RoutesHome from './routes/RoutesHome';
import RoutesLogin from './routes/routesLogin';
import RoutesAdmin from './routes/routesAdmin';
import RoutesTeacher from './routes/routesTeacher';
import RoutesStudent from './routes/routesStudent';
import './style.css';

function App() 
{
  return (
    <div className="App">
      <RoutesHome />
      <RoutesLogin />
      <RoutesAdmin />
      <RoutesTeacher />
      <RoutesStudent />
    </div>
  );
}

export default App;
