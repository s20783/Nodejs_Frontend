import {isKapitan} from "../../helpers/authHelper";
import React from "react";
import {Navigate, Outlet, useParams} from "react-router";

function RequireAuthUser() {
    const p = useParams();
    if (!isKapitan(p.klubID)) {
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