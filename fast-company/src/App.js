import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navBar.jsx";
import UsersList from "./components/usersList.jsx";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Loading from "./components/loading";

export function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path = "/" exact component={Main}/>
                <Route path = "/login" component={Login}/>
                <Route path = "/users/:userId?" component={UsersList}/>
                <Route path = "/loading" component = {Loading}/>
                <Redirect to = "/loading"/>
                <Redirect from = "../users/" to = "/loading"/>
            </Switch>
        </div>
    );
};
