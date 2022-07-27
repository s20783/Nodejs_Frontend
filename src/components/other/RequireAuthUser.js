import {isAuthenticated2} from "../../helpers/authHelper";
import React from "react";
import {Navigate, Outlet, useParams} from "react-router";

function RequireAuthUser() {
    const p = useParams();
    if (!isAuthenticated2(p.zawodnikID)) {
        return <Navigate to={{
            pathname: "/",
            state: {
                //notice: notice
            }
        }}/>;
    }

    return <Outlet />;
}

export default RequireAuthUser