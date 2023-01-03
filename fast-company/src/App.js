import React, {useState} from "react";
import { Users } from "./components/users.jsx";
import  { SearchStatus } from "./components/searchStatus.jsx";
import api from "./api"

export function App(){
    const [usersList, setUsersList] = useState(api.users.fetchAll())

    const handleBoookMark = (userId) => {
        const usersListBM = usersList.map(user => {
            if (user._id === userId){
                user.bookmark = !user.bookmark
            }
            return user
        })
        setUsersList(usersListBM)
    }

    const handleDelete = (userId) => {
        const currentUsersList = usersList.filter(user => user._id !== userId)
        setUsersList(currentUsersList)
    }

    const createThead = () => {
        if (usersList.length !== 0) 
        return (
             <tr>
                 <th scope="col">Имя</th>
                 <th scope="col">Качества</th>
                 <th scope="col">Профессия</th>
                 <th scope="col">Встретился, раз</th>
                 <th scope="col">Оценка</th>
                 <th scope="col">Закладки</th>
                 <th scope="col"></th>
             </tr>
    )}

    return( 
        <>  
            <h1>
                <SearchStatus
                    length = {usersList.length}
                />
            </h1>    
            <table className="table table-striped">
                <thead>
                    { createThead() }
                </thead>
                <tbody>
                    {usersList.map(user => (
                        <Users
                            key={user._id}
                            {...user}
                            onDelete = {handleDelete}
                            onBookMark = {handleBoookMark}
                        />
                    ))}
                </tbody>
            </table>
        </>
      )
}









/* мой исходный код:
export const Users = () => {

    // const [usersAll, setUsersAll] = useState(api.users.fetchAll())
    
        if (usersAll.length > 4) return (
            <span className="badge bg-primary"> { usersAll.length } человек тусанет с тобой сегодня </span>
            )
        else if (usersAll.length <= 4 && usersAll.length > 1) return (
            <span className="badge bg-primary"> { usersAll.length } человека тусанут с тобой сегодня </span>
            )
        else if (usersAll.length === 1) return (
            <span className="badge bg-primary"> { usersAll.length } человек тусанет с тобой сегодня </span>
            )
        else return (
            <span className="badge bg-danger"> Никто с тобой не тусанет </span>
            )
    }

    const createThead = () => {
        if (usersAll.length !== 0) return (
             <tr>
                 <th scope="col">Имя</th>
                 <th scope="col">Качества</th>
                 <th scope="col">Профессия</th>
                 <th scope="col">Встретился, раз</th>
                 <th scope="col">Оценка</th>
                 <th scope="col"></th>
             </tr>
    )}

    const createTbody = () => {

        const getQualityClasses = (array) => {
            let classes = 'badge m-1 badge bg-'
            classes += array.color
            return classes
        }
    
        const getQualities = (array) => {
            return array.map(quality => {
                return (
                    <span
                        key = { quality._id }
                        className = { getQualityClasses(quality) }
                    >
                        { quality.name }
                    </span>
                )
            })
        }
        
        return usersAll.map((person)=>{

            const handleDeleteElement = (userId) => {

                // В результате вызова данного метода мы сохраняем в массиве только те элементы, которые
                // не равны "person._id" (то есть не равны id полученного элемента при нажатии на кнопку)
                setUsersAll(usersAll.filter((user) => user._id !== userId))

                    //     const foundIndex = usersAll.findIndex((element) => {
                    //         return element._id === person._id
                    //     })
                    //     const foundElement = usersAll.find((element) => {
                    //         return element._id === person._id
                    //     })
                    // console.log(foundIndex, foundElement)
            }

            return (
                    <tr key = { person._id }>
                            <td>{ person.name }</td>
                            <td> 
                                <h6> { getQualities(person.qualities) }</h6>
                            </td>
                            <td>{ person.profession.name }</td>
                            <td>{ person.completedMeetings }</td>
                            <td>{ person.rate }/5</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick = { () => handleDeleteElement(person._id) }
                                >
                                        Delete
                                </button>
                        </td>
                    </tr>
            )
        })
    }

    const createTable = () => {

        return (
            <>  
                <h1>
                    { createHeader() }
                </h1>
                    
                <table className="table table-striped">
                    <thead>
                        { createThead() }
                    </thead>
                    <tbody>
                        { createTbody() }
                    </tbody>
                </table>
            </>
        )
    }

    return createTable()
}
*/