import React,{ useState } from "react";
import TabsWriting from "./Tabs";
import WritingsStudent from "./WritingsStudent";
import WritingsTeam from "./WritingsTeam";
import '../../../styles/styleCard.css';

function WritingTabs(props) {
    const [count, setCount] = useState(0);
    const data = [
            { id: 1, name: "Escritos", content: () => <WritingsStudent key={props.groupSelect} groupSelect={props.groupSelect}/>, state: "active" },
            { id: 2, name: "Escritos en equipo", content: () => <WritingsTeam key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];

    return (
        <div className="row-edit">
            <TabsWriting data={data} />
        </div>
    );
}

export default WritingTabs;