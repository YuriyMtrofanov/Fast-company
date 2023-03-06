import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditPage from "../components/page/userEditPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId
                ? (edit
                    ? <EditPage/>
                    : <UserPage userId = {userId}/>)
                : (<UsersListPage />)
            }
        </>
    );
};

export default Users;
