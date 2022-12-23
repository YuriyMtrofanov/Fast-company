import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

function handleDeleteElement(){
    console.log('click')
    // const [del, setDelete] = useState(0)
}

function getQualities(arr){
    {/* В этом месте каждый дочерний эдемент должен иметь уникальный ключ, но он не присваеваеися почему-то */}
    return arr.map(quality => {
        console.log((quality.color))
        return (
            <span 
                key = {quality._id} 
                className = { getQualityClasses(quality) }
            >
                { quality.name }
            </span>
        )
    })
}

function getQualityClasses(array){
    let classes = 'badge m-1 badge bg-'
    classes += array.color
    return classes
}

function createLine(){
    const allUsers = api.users.fetchAll()
    return allUsers.map((line)=>{
        // console.log()
        return (
            <>
            {/* В этом месте каждый дочерний эдемент должен иметь уникальный ключ, но он не присваеваеися почему-то */}
                <tr key = {line._id}>    
                    <td>{ line.name }</td>
                    <td> 
                        <h6>
                            { getQualities(line.qualities) }
                        </h6>
                    </td>
                    <td>{ line.profession.name }</td>
                    <td>{ line.completedMeetings }</td>
                    <td>{ line.rate }/5</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick = { handleDeleteElement }>Delete</button>
                    </td>
                </tr>
            </>
        )
    })
}

function createTable(){
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
                <tbody>
                    { createLine() }
                </tbody>
            </table>
        </>
    )
}


const Users = () => {

    // createLine()
    return createTable()
}

export default Users