import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditPage from "../components/page/userEditPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {userId
                    ? (edit
                        ? <EditPage/>
                        : <UserPage userId = {userId}/>)
                    : (<UsersListPage />)
                }
            </UserProvider>
        </>
    );
};

export default Users;
