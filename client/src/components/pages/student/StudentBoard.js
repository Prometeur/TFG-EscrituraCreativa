/*
*  Name_file :HomeStudent.js
*  Description: Pagina home del estudiante,contiene la vista del home del estudiante
*    
*/
import React, { Component } from 'react';
import UserService from "../../../services/user/UserService"

class StudentBoard extends Component 
{

    constructor(props){
        super(props)

        this.state = {
            data:"",
        }    
    }

    
    componentDidMount() 
    {
        UserService.getStudentBoard().then(
            response => {
                this.setState({
                    data: response.data
                });
            });
    }

    /*Dibuja la pagina */
    render() 
    {
        return (
            <div>
                Hello I m Student;
            </div>
        );
    }
}

export default StudentBoard;