import React, { useState, useEffect } from "react";


import TabsWriting from "./TabsWriting";
import TeacherService from '../../../services/teacher/teacherService.js';

import WritingsStudent from "./WritingsStudent";
import Card from 'react-bootstrap/Card';



function Writings(props) {
    const [count, setCount] = useState(0);
    const [dataChallenges, setDataChallenges] = useState([]);
    const [showWritings, setShowWritings] = useState(false);
    const [idChallenge, setIdChallenge] = useState("");

    let data = [
        { id: 1, name: "Escritos", prueba: idChallenge, content: () => <WritingsStudent key={props.groupSelect} groupSelect={props.groupSelect} idChallenge={idChallenge} />, state: "active" },
        //  { id: 2, name: "Escritos en equipo", content: () => <WritingsTeam key={props.groupSelect} groupSelect={props.groupSelect} />, state: "inactive" },
    ];

    useEffect(() => {
        //obtiene todos los desafios del profesor
        TeacherService.getChallenges(props.groupSelect)
            .then(response => {
                setDataChallenges([...dataChallenges, response])

            })

    }, []);

    const selectionChallenge = event => {
        setIdChallenge(event.target.value)
        console.log(idChallenge);
        setShowWritings(true)
    };

    return (
        <Card className={"card-edit"}>
            <Card.Body>
                <div className="form-select">
                    <label className='form-label'>Selecciona Desafio</label>
                    <select onChange={selectionChallenge} >
                        <option value="" selected disabled hidden > Seleccionar</option>
                        {dataChallenges.length > 0 ? dataChallenges[0].map(elemento => (
                            <option key={elemento.id} value={elemento.id} > { elemento.titulo} </option>
                        )) : null}
                    </select>
                </div>


            {showWritings ? (

                // <TabsWriting data={data} />
                <div className="row">
                    <WritingsStudent key={props.groupSelect} groupSelect={props.groupSelect} idChallenge={idChallenge} />
                </div>
            ) : (
                <div>

                </div>

            )}
            </Card.Body>
        </Card>

    );


}

export default Writings;