import React,{ useState } from "react";


import TabsWriting from "./TabsWriting";

import WritingsStudent from "./WritingsStudent";
import WritingsTeam from "./WritingsTeam";



function Team(props) {
    const [count, setCount] = useState(0);

    const data = [
            { id: 1, name: "Escritos", content: () => <WritingsStudent key={props.groupSelect} groupSelect={props.groupSelect}/>, state: "active" },
             { id: 2, name: "Escritos en equipo", content: () => <WritingsTeam key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];
        
    return (
        <div>
            <TabsWriting data={data} />
        </div>
    );


}

export default Team;