import React from "react";

import Tabs from "./Tabs/Tabs";
import Challenges from "./Challenges";
import Writings from "./Writings";

import Cookies from 'universal-cookie';
const cookies = new Cookies();//cokies guarda la informacion de la sesion del usuario

const data = [
  { id: 1, name: "Desafíos", content: () => <Challenges />, state: "active" },
  { id: 2, name: "Escritos", content: () => <Writings />, state: "inactive" },
];


function Group() {


  /*Elimina los datos de sesion almacenada por las cookies*/
  const cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('correo', { path: "/" });
    cookies.remove('nombre', { path: "/" });
    cookies.remove('apellidos', { path: "/" });
    cookies.remove('foto', { path: "/" });
    cookies.remove('activo', { path: "/" });
    cookies.remove('rol', { path: "/" });
    window.location.href = './';
  }

  return (
    <div className="container">
      <h2> Group Student</h2>
      <nav>
        <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
        <br />
        <br />
      </nav>
      <Tabs data={data} />
    </div>
  );
}

export default Group;
