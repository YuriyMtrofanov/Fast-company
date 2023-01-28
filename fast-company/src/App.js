import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navBar.jsx";
import { Users } from "./components/users.jsx";
import Main from "./layouts/main";
import Login from "./layouts/login";
import User from "./components/user";

export function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path = "/" exact component={Main}/>
                <Route path = "/login" component={Login}/>
                <Route path = "/users/:userId" component={User}/>
                <Route path = "/users" component={Users}/>
            </Switch>
        </div>
    );
};
