import React from 'react';
import './App.css';
import { Switch, Route,Link} from "react-router-dom";


import Users from './components/Users';

function App() {
    return (
         <div>
            <Link to={"/user"} className="nav-link">
              Usuarios
            </Link>
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/user"]} component={Users} />
              </Switch>
            </div>
        </div>
    );
}

export default App;
