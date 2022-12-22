import React from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"



function createTable(){
    const userName = api.users.fetchAll()[0].name
    const userProfession = api.users.fetchAll()[0].profession.name
    const completedMeetings = api.users.fetchAll()[0].completedMeetings
    const userRate = api.users.fetchAll()[0].rate
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                {/* Данная строка уже должна рендериться с помощью функции и метода map() */}
                <tbody>
                    <tr>
                        <td>{ userName }</td>
                        <td> 'вызов ф-ии getQualities()' </td>
                        <td>{ userProfession }</td>
                        <td>{ completedMeetings }</td>
                        <td>{ userRate }</td>
                        <td>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

function getQualities(){
    const userQualities = api.users.fetchAll()[0].qualities
        userQualities.map((quality) => {
            // return (
            //     <li key = {quality._id} className = 'btn btn-primary btn-sm m-2'> 
            //             {quality.name}
            //     </li>
            // )  
        })
}

const Users = () => {
    // console.log(api.users.fetchAll()[0].qualities[0]
    // )
    getQualities()
    return createTable()
}

export default Users