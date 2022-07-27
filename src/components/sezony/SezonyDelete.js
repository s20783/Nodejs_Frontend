import React from "react";
import {useParams} from "react-router-dom";
import {Navigate} from "react-router";
import {deleteSezon} from "../../api/sezonyApiCalls";

class SezonyDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            ID_sezon: this.props.params.sezonID,
        }
    }
    componentDidMount() {
        deleteSezon(this.state.ID_sezon)
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
                        pathname: "/sezony",
                        state: {
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
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withRouter(SezonyDelete);