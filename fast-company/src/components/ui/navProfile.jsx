import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMemu = () => {
        return setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMemu}>
            <div className="dropdown-toggle d-flex alighn-items-center">
                <div className="me-2">
                    {currentUser.name}
                    <img
                        src={currentUser.image}
                        alt=""
                        height="40"
                        className="img-responsive rounded-circle"
                    />
                    <div className = {"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                        <Link to = {`/users/${currentUser._id}`} className="dropdown-item" >Profile</Link>
                        <Link to = "/logout" className="dropdown-item">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
