
import React from 'react';
import './App.css';
import { Switch, Route,Link} from 'react-router-dom';


import ListaGrupo from './Components/ListaGrupo';

function App() {
    return (
         <div>
            
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/user"]} component={ListaGrupo} />
              </Switch>
            </div>
        </div>
    );
}

export default App;
