import React from "react";
import PropTypes from "prop-types";
// import api from "../../../api";
import UserCard from "../../ui/cards/userCard";
import QualitiesCard from "../../ui/cards/qualitiesCard";
import MeetingsCard from "../../ui/cards/meetingsCard";
import Comments from "../../ui/cards/comments";
import { useUser } from "../../../hooks/useUsers";

const UserPage = ({ userId }) => {
    const { getUserbyId } = useUser();
    const user = getUserbyId(userId);
    // const [user, setUser] = useState("");
    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setUser(data));
    // }, []);
    if (user) {
        return (
            // <div>
            //     <h1> {user.name}</h1>
            //     <h2>Профессия: {user.profession.name}</h2>
            //     <Qualities qualities={user.qualities} />
            //     <p>completedMeetings: {user.completedMeetings}</p>
            //     <h2>Rate: {user.rate}</h2>
            //     <button onClick={handleClick}>Изменить</button>
            //     <UserCard userId = {userId}/>
            // </div>
            <div className="container">
                <div className="row gutters-sm">
                    <div className = "col-md-4 mb-3">
                        <UserCard user = {user}/>
                        <QualitiesCard data = {user.qualities}/>
                        <MeetingsCard meetings = {user.completedMeetings}/>
                    </div>
                    <div className = "col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
