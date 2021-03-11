/*
*  Name_file :HomeStudent.js
*  Description: Pagina home del estudiante,contiene la vista del home del estudiante
*    
*/
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const baseUrl = "http://localhost:3001/student/getGroupStudent";
const cookies = new Cookies();


function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!cookies.get('correo')) {
            window.location.href = "/";
        }

        axios.get(baseUrl, { params: { idEstudiante: cookies.get('id') } }).then(response => {
            setData(response.data);
        }).catch(error => {
            // console.log(error.message);
        })
    });

    /*Elimina los datos de sesion almacenada por las cookies*/
    /*path "/" ruta para que la cookie sea accecible a traves de todas las paginas pone el manual
    entiendo que si coloco esto al eliminar la cookie se eliminara en todas las paginas de la app
    */
    const cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellidos', { path: "/" });
        cookies.remove('foto', { path: "/" });
        cookies.remove('activo', { path: "/" });
        cookies.remove('rol', { path: "/" });
        window.location.href = "/";
    }

    /*Cambia la vista a otra grupoStudent */
    const changeView = (idGroup) => {
        cookies.set('groupSelect', idGroup, { path: "/" });
        window.location.href = '/student/group';
    }

    return (
        <>
            <div className='HomeContainer'>
                <h2> Soy Home del Estudiante</h2>
                <nav>
                    <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                </nav>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>idGrupo</th>
                                <th>idEstudiante</th>

                            </tr>
                        </thead>

                        <tbody>
                            {data.map(grupo => {
                                return (
                                    <tr>
                                        <td>{grupo.idGrupo}</td>
                                        <td>{grupo.idEstudiante}</td>
                                        <td> <button onClick={() => changeView(grupo.idGrupo)}>ir grupo</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default Home;