import React from "react"
import { Qualitie } from "./qualitie"
import { BookMark } from "./bookmark"
import "bootstrap/dist/css/bootstrap.css"

export const User = (props) => {
    return (
        <tr>
            <td> {props.name} </td>
            <td> 
                {props.qualities.map(qualitie => (
                    <Qualitie 
                        key = { qualitie._id }
                        {...qualitie}
                    />
                ))}
            </td>
            <td> {props.profession.name} </td>
            <td> {props.completedMeetings} </td>
            <td> {props.rate} /5</td>
            <td> 
                <span className="btn btn-light btn-sm" onClick = {() => props.onBookMark(props._id)}>
                    {<BookMark bookmark = {props.bookmark}/>}
                </span>
            </td>
            <td> 
                <button type="button" className="btn btn-danger" onClick = {()=>props.onDelete(props._id)}> Delete </button>
            </td>
        </tr>
    )
}