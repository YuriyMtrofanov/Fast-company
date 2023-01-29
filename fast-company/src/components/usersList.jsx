import React from "react";
import { useParams } from "react-router-dom";
import { Users } from "./users";
import User from "./user";

const UsersList = () => {
    const { userId } = useParams();
    return (
        <>
            { userId
                ? <User />
                : <Users />
            }
        </>
    );
};

export default UsersList;
