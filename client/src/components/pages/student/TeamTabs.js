/*
*  Name_file :TeamTabs.js
*  Description: Pagina que contiene las pestañas de equipos
*/

// import React, { useState } from "react";

import Tabs from "./Tabs";

import TeamStudent from "./TeamStudent";
import TeamsGroup from "./TeamsGroup";


// function TeamTabs(props) {
//     const [count, setCount] = useState(0);

//     const data = [
//             { id: 1, name: "Equipos", content: () => <TeamsGroup key={props.groupSelect} groupSelect={props.groupSelect} />, state: "active" },
//             { id: 2, name: "Mi Equipo", content: () => <TeamStudent key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
//     ];

//     return (
//         <div>
//             <Tabs data={data} />
//         </div>
//     );
// }

// export default TeamTabs;

import React, { Component } from 'react';
class TeamTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data :[
                { id: 1, name: "Equipos", content: () => <TeamsGroup key={props.groupSelect} groupSelect={props.groupSelect} />, state: "active" },
                { id: 2, name: "Mi Equipo", content: () => <TeamStudent key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
            ]
        }
    }

    render() {
        return (
            <div>
                <Tabs data={this.state.data} />
            </div>
        );

    }
}

export default TeamTabs;