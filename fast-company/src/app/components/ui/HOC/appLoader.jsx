import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";
import { getIsLoggedIn, getUsersList, getUsersLoadingStatus } from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        console.log("AppLoader isLoggedIn", isLoggedIn)
        if (isLoggedIn) {
            dispatch(getUsersList());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "loading..."
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
