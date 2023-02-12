import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Loading from "./components/ui/loading";
import Users from "./layouts/users";

export function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path = "/" exact component={Main}/>
                <Route path = "/login/:type?" component={Login}/>
                <Route path = "/users/:userId?" component={Users}/>
                <Route path = "/loading" component = {Loading}/>
                <Redirect to = "/loading"/>
                <Redirect from = "../users/" to = "/loading"/>
            </Switch>
        </div>
    );
};
