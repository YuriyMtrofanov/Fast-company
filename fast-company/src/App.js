import React, { useState } from "react";
import { Users } from "./components/users.jsx";
import  { SearchStatus } from "./components/searchStatus.jsx";
import api from "./api"


export function App(){
const [usersAll, setUsersAll] = useState(api.users.fetchAll())
const handleDelete = (userId) = {}
const handleToggleBookmark = (id) = {}
return(    
    <div>Таблица</div>
)
}
