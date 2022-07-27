import React from 'react'
import {isAdmin} from "../../helpers/authHelper";
import {Navigate} from "react-router";


class ProtectedRouter extends React.Component {

    render() {
        const Element = this.props.Component;
        return isAdmin() ? (
            <Element/>
        ) : (
            <Navigate to={{
                pathname: "/",
                state: {
                    //notice: notice
                }
            }}/>
        );
    }
}

export default ProtectedRouter;