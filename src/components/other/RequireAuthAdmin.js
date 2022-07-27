import {isAdmin} from "../../helpers/authHelper";
import React from "react";
import {Navigate, Outlet} from "react-router";

function RequireAuthAdmin() {
    if (!isAdmin()) {
        return <Navigate to={{
            pathname: "/",
            state: {
                //notice: notice
            }
        }}/>;
    }

    return <Outlet />;
}

export default RequireAuthAdmin