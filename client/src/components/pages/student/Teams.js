import React,{ useState } from "react";


import Tabs from "./TabsTeam";

import TeamsStudent from "./TeamsStudent";
import TeamsGroup from "./TeamsGroup";

// const data = [
//     { id: 1, name: "Equipos", content: () => <TeamsGroup key={"66"} groupSelect="67"/>, state: "active" },
//     { id: 2, name: "Mis Equipos", content: () => <TeamsStudent />, state: "inactive" },
// ];

function Team(props) {
    const [count, setCount] = useState(0);

    const data = [
            { id: 1, name: "Equipos", content: () => <TeamsGroup key={props.groupSelect} groupSelect={props.groupSelect}/>, state: "active" },
            { id: 2, name: "Mi Equipo", content: () => <TeamsStudent key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];
        
    return (
        <div>
            <Tabs data={data} />
        </div>
    );


}

export default Team;