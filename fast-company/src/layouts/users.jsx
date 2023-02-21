import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";

const Users = () => {
    const { userId } = useParams();
    return (
        <>
            { userId
                ? <UserPage />
                : <UsersListPage />
            }
        </>
    );
};

export default Users;
