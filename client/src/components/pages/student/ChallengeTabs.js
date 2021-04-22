import React,{ useState } from "react";


// import TabsChallenge from "./TabsChallenge";
import Tabs from "./Tabs";

import ChallengesStudent from "./ChallengesStudent";
import ChallengesTeam from "./ChallengesTeam";


function ChallengeTabs(props) {
    const [count, setCount] = useState(0);
    const data = [
            { id: 1, name: "Desafios", content: () => <ChallengesStudent key={props.groupSelect} groupSelect={props.groupSelect}/>, state: "active" },
            { id: 2, name: "Desafios en Equipo", content: () => <ChallengesTeam key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];
        
    return (

        <>
            <Tabs data={data} />
        </>

    );
}

export default ChallengeTabs;