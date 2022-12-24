import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

export const Users = () => {

    const [usersAll, setUsersAll] = useState(api.users.fetchAll())
    // 1. Требуется разобраться с уникальными ключами элементов
    // 2. Подготовить функцию, которая будет корректно склонять слова

    const getQualityClasses = (array) => {
        let classes = 'badge m-1 badge bg-'
        classes += array.color
        return classes
    }

    const getQualities = (array) => {
        return array.map(quality => {
            return (
                <span 
                    id = { quality._id }
                    key = { quality._id }   // Данный атрибут не присваивается
                    className = { getQualityClasses(quality) }
                >
                    { quality.name }
                </span>
            )
        })
    }

    const createLine = () => {
        
        return usersAll.map((line)=>{

            // Здесья я отлавливаю событие на кнопке "delete" получаю id элемента и с помощью setUsersAll() и метода filter() оставляю 
            // в массиве с  юзерами только те значения, по которым не было кликов.
            const handleDeleteElement = () => {

                    // В принципе, эта часть кода не нужна. Она лишь позволяет получить элемент, по которому произошел клик
                        const foundIndex = usersAll.findIndex((element) => {
                            return element._id === line._id
                        })
                        const foundElement = usersAll.find((element) => {
                            return element._id === line._id
                        })


                    console.log(foundIndex, foundElement)
                
                // В результате вызова данного метода мы сохраняем в массиве только те элементы, которые не 
                // равны "line._id" (то есть не равны id полученного элемента при нажатии на кнопку)
                setUsersAll(prevState => prevState.filter((element) => element._id !== line._id))
            }

            return (
                <>  
                    <tr id = { line._id }
                        key = { line._id }  // Данный атрибут не присваивается
                    >    
                            <td>{ line.name }</td>
                            <td> 
                                <h6> { getQualities(line.qualities) }</h6>
                            </td>
                            <td>{ line.profession.name }</td>
                            <td>{ line.completedMeetings }</td>
                            <td>{ line.rate }/5</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick = { () => handleDeleteElement(line._id) }
                                >
                                        Delete
                                </button>
                        </td>
                    </tr>
                </>
            )
        })
    }

    const createTable = () => {

        return (
            <>  
                <h2> 
                    <span className="badge bg-primary"> { usersAll.length } человек тусанет с тобой сегодня </span>
                </h2>
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

    return createTable()
}