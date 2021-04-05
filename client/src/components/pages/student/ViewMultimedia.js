import React, { Component, forwardRef } from 'react';

/**Servicios del estudiante */
import StudentService from '../../../services/student/student-service.js';

/*Importaciones del Video*/
import ReactPlayer from "react-player";



class ViewMultimedia extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            showVideo: false,
            showImage: false,
            path: this.props.location.state.path,
        }
    }

    componentDidMount() {
        if (this.props.location.state.path.includes("video") || this.props.location.state.path.includes("audio"))
            this.setState({ showVideo: true, showImage: false });
        else {
            this.setState({ showVideo: false, showImage: true });
        }

    }

    render() {

        return (
            <>

                <div >
                    {this.state.showVideo ? (
                        <div >

                            <ReactPlayer className="video" url={this.props.location.state.path} controls={true} />;
                        </div>

                    ) : (
                        <div>
                            
                                {/* <img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="http://localhost:3001/multimedia/users/4/262/image/digital.jpg" width="938" height="527"> */}
                                {/* <img className="image" src={this.props.location.state.path} alt="" /> */}
                                {/* style={{ width: "210px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} */}
                                <img   style={{backgroundPosition: "center",  backgroundSize: "cover" }} src={this.props.location.state.path} width="1284" height="722"/>
                          
                        </div>
                    )}
                        </div>
            </>
        );
    }
}

export default ViewMultimedia;

// let media1 = "";
// if (this.state.form.file.type !== undefined) {//si hemos previsualizado un archivo
//     if (this.state.form.file.type.includes("image"))
//         media1 = <img className="image" src={this.state.form.reader} alt="" />;
//     else
//         media1 = <ReactPlayer className="video" url={this.state.form.reader} controls={true} />;
// }
// else {//si no hemos previsualizado un archivo
//     if (this.state.form.path == null || this.state.form.path === "") {//si la url es vacia o no contiene una url (recibido de la bd)
//         media1 = <img className="image" src="http://localhost:3001/images/drop-files.jpg" alt="" />;
//     }
//     else {
//         media1 = <img className="image" src={this.state.form.path} alt="" />;//si contine una url (recibido de la bd)
//     }
// }


  {/* <td><a href={challenge.ruta}>Ver</a></td> */}
                                                {/* <td ><Link to={{ pathname:`/student/viewMultimedia`, state: {
                                                            path: challenge.ruta
                                                            
                                                }}}><Button variant="outline-primary">Ver</Button></Link></td> */}


{/* <td><a href={writing.ruta}>Ver</a></td> */}
  {/* <td > < button onClick={() => this.deleteFile(writing)} > Eliminar </button> </td> */}
//Editar escrito
   // //Previsualización del fichero(image, video o audio)
    // onFileChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0]
    //         if (file.type.includes("image") || file.type.includes("video") || file.type.includes("audio")) {
    //             const reader = new FileReader()
    //             reader.readAsDataURL(file)
    //             reader.onload = () => {
    //                 this.setState({
    //                     form: {
    //                         ...this.state.form,
    //                         reader: reader.result
    //                     }
    //                 });
    //             }
    //             var str = file.type;
    //             var res = str.split("/");
    //             const dir = this.state.form.idWriter + "/" + res[0] + "/";
    //             this.setState({
    //                 form: {
    //                     ...this.state.form, file:
    //                         file,
    //                     path: "http://localhost:3001/multimedia/" + dir + file.name
    //                 }
    //             });
    //         }
    //         else
    //             console.log("there was an error")
    //     }
    // }

        //Elimina fichero multimedia del escrito
    // deleteFile = (writing) => {

    //     var str = writing.ruta;
    //     var res = str.split("/");
    //     var opcion = window.confirm("Estás Seguro que deseas Eliminar " + res[7]);

    //     if (opcion === true) {
    //         var contador = 0;
    //         var arreglo = this.state.dataMediaWriting;
    //         arreglo.map((registro) => {
    //             if (writing.id === registro.id) {
    //                 arreglo.splice(contador, 1);
    //             }
    //             contador++;
    //         });
    //         this.setState({ dataMediaWriting: arreglo });
    //         StudentService.deleteMultimedia(writing.id, writing.ruta)
    //             .then(response => {
    //             })
    //             .catch(error => {
    //                 console.log(error.message);
    //             });
    //     }
    // }


//Crearescrito
        // //Previsualización del fichero(image, video o audio)
    // onFileChange = (e) => {
    //     debugger;
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0]
    //         if (file.type.includes("image") || file.type.includes("video") || file.type.includes("audio")) {
    //             const reader = new FileReader()
    //             reader.readAsDataURL(file)
    //             reader.onload = () => {
    //                 this.setState({
    //                     form: {
    //                         ...this.state.form,
    //                         reader: reader.result
    //                     }
    //                 });
    //             }
    //             var str = file.type;
    //             var res = str.split("/");
    //             const dir = this.state.form.idWriter + "/" + res[0] + "/";
    //             this.setState({
    //                 form: {
    //                     ...this.state.form,
    //                     file: file,
    //                     path: "http://localhost:3001/multimedia/" + dir + file.name
    //                 }
    //             });
    //         }
    //         else {
    //             console.log("there was an error")
    //         }
    //     }
    // }