import React,{ useState } from "react";


import TabsChallenge from "./TabsChallenge";

import ChallengesStudent from "./ChallengesStudent";
import ChallengesTeam from "./ChallengesTeam";

// const data = [
//     { id: 1, name: "Equipos", content: () => <TeamsGroup key={"66"} groupSelect="67"/>, state: "active" },
//     { id: 2, name: "Mis Equipos", content: () => <TeamsStudent />, state: "inactive" },
// ];

function Challenges(props) {
    const [count, setCount] = useState(0);
    const data = [
            { id: 1, name: "Desafios", content: () => <ChallengesStudent key={props.groupSelect} groupSelect={props.groupSelect}/>, state: "active" },
            { id: 2, name: "Desafios en Equipo", content: () => <ChallengesTeam key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];
        
    return (
        <>
            <TabsChallenge data={data} />
        </>
    );
}

export default Challenges;