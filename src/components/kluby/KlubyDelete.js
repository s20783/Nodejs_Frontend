import React from "react";
import {useParams} from "react-router-dom";
import {deleteKlub} from "../../api/klubyApiCalls";
import {Navigate} from "react-router";

class KlubyDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ID_klub: this.props.params.klubID,
        }
    }
    componentDidMount() {
        deleteKlub(this.state.ID_klub)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            redirect: true
                        })
                    }
                }
            )
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            if (redirect) {
                return (
                    <Navigate to={{
                        pathname: "/kluby",
                        state: {
                            //notice: notice
                        }
                    }}/>
                )
            }
        } else {
            return null
        }
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams(); // <-- these are the path params
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

export default withRouter(KlubyDelete);