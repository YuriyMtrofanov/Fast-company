import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
// import Loading from "./components/ui/loading";

export function App() {
    return (
        <div>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path = "/users/:userId?/:edit?" component={Users}/>
                        <Route path = "/login/:type?" component={Login}/>
                        <Route path = "/" exact component={Main}/>
                        <Redirect to = "/"/>
                        {/* <Route path = "/loading" component = {Loading}/>
                        <Redirect to = "/loading"/>
                        <Redirect from = "../users/" to = "/loading"/> */}
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </div>
    );
};
